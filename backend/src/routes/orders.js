import { Router } from 'express';
import { prisma } from '../db.js';
import { authenticate, requireAdmin } from '../middleware.js';
const router=Router();
const include={items:true};
const shape=o=>({id:o.code,customer:o.customer,email:o.email,phone:o.phone,address:o.address,payment:o.payment,total:o.total,status:o.status,date:new Date(o.createdAt).toLocaleDateString('vi-VN'),items:o.items.reduce((s,x)=>s+x.qty,0),itemsList:o.items.map(x=>({id:x.productId,name:x.name,image:x.image,price:x.price,qty:x.qty}))});
router.get('/',authenticate,async(req,res)=>{const rows=await prisma.order.findMany({where:req.user.role==='admin'?{}:{userId:req.user.id},include,orderBy:{createdAt:'desc'}});res.json(rows.map(shape))});
router.post('/',authenticate,async(req,res)=>{
  const {items, name, phone, address, payment='cod'}=req.body||{};
  if(!Array.isArray(items)||!items.length||!name?.trim()||!phone?.trim()||!address?.trim())return res.status(400).json({message:'Thông tin đặt hàng chưa đầy đủ.'});
  try{
    const order=await prisma.$transaction(async tx=>{
      let total=0; const orderItems=[];
      for(const line of items){
        const qty=Math.floor(Number(line.qty)); const product=await tx.product.findUnique({where:{id:Number(line.productId)}});
        if(!product||qty<1)throw new Error('Sản phẩm không hợp lệ.');
        if(product.stock<qty)throw new Error(`Sản phẩm ${product.name} không đủ tồn kho.`);
        total+=product.price*qty; orderItems.push({productId:product.id,name:product.name,image:product.image,price:product.price,qty});
        await tx.product.update({where:{id:product.id},data:{stock:{decrement:qty}}});
      }
      const count=await tx.order.count(); const code=`NT-${String(Date.now()).slice(-7)}-${count+1}`;
      return tx.order.create({data:{code,userId:req.user.id,customer:name.trim(),email:req.user.email,phone:phone.trim(),address:address.trim(),payment,total,items:{create:orderItems}},include});
    });
    res.status(201).json(shape(order));
  }catch(e){res.status(400).json({message:e.message||'Không thể tạo đơn hàng.'})}
});
router.patch('/:id/status',authenticate,requireAdmin,async(req,res)=>{
  const allowed=['Chờ xác nhận','Đang giao','Hoàn tất','Đã hủy']; const {status}=req.body||{};
  if(!allowed.includes(status))return res.status(400).json({message:'Trạng thái không hợp lệ.'});
  try{const o=await prisma.order.update({where:{code:req.params.id},data:{status},include});res.json(shape(o))}catch{return res.status(404).json({message:'Không tìm thấy đơn hàng.'})}
});
export default router;
