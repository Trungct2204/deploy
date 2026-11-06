import { Router } from 'express';
import { prisma } from '../db.js';
import { authenticate, requireAdmin } from '../middleware.js';
const router=Router();
const fields=['name','category','brand','price','oldPrice','rating','stock','badge','color','image','emoji','description'];
const pick=body=>Object.fromEntries(fields.filter(k=>body[k]!==undefined).map(k=>[k,body[k]]));
router.get('/',async(req,res)=>{
  const {q,category,sort}=req.query;
  const where={...(category&&category!=='Tất cả'?{category}:{}),...(q?{OR:[{name:{contains:String(q)}},{brand:{contains:String(q)}},{category:{contains:String(q)}}]}:{})};
  const orderBy=sort==='price-asc'?{price:'asc'}:sort==='price-desc'?{price:'desc'}:sort==='rating'?{rating:'desc'}:{createdAt:'desc'};
  res.json(await prisma.product.findMany({where,orderBy}));
});
router.get('/:id',async(req,res)=>{const p=await prisma.product.findUnique({where:{id:Number(req.params.id)}}); if(!p)return res.status(404).json({message:'Không tìm thấy sản phẩm.'});res.json(p)});
router.post('/',authenticate,requireAdmin,async(req,res)=>{try{const p=await prisma.product.create({data:pick(req.body)});res.status(201).json(p)}catch{res.status(400).json({message:'Dữ liệu sản phẩm không hợp lệ.'})}});
router.patch('/:id',authenticate,requireAdmin,async(req,res)=>{try{const p=await prisma.product.update({where:{id:Number(req.params.id)},data:pick(req.body)});res.json(p)}catch{res.status(404).json({message:'Không tìm thấy sản phẩm.'})}});
router.delete('/:id',authenticate,requireAdmin,async(req,res)=>{try{await prisma.product.delete({where:{id:Number(req.params.id)}});res.json({message:'Đã xóa sản phẩm.'})}catch{res.status(409).json({message:'Không thể xóa sản phẩm đã phát sinh đơn hàng.'})}});
export default router;
