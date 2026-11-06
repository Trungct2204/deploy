import { Router } from 'express';
import { prisma } from '../db.js';
import { authenticate, requireAdmin } from '../middleware.js';
const router=Router(); router.use(authenticate,requireAdmin);
router.get('/dashboard',async(req,res)=>{
 const [orders,products,customers]=await Promise.all([prisma.order.findMany(),prisma.product.findMany(),prisma.user.count({where:{role:'customer'}})]);
 const revenue=orders.filter(o=>o.status!=='Đã hủy').reduce((s,o)=>s+o.total,0);
 res.json({revenue,orderCount:orders.length,pendingCount:orders.filter(o=>o.status==='Chờ xác nhận').length,productCount:products.length,lowStock:products.filter(p=>p.stock<=8).length,customerCount:customers});
});
router.get('/customers',async(req,res)=>{
 const users=await prisma.user.findMany({where:{role:'customer'},include:{orders:true},orderBy:{createdAt:'desc'}});
 res.json(users.map(u=>({id:u.id,name:u.name,email:u.email,phone:u.phone,orders:u.orders.length,total:u.orders.reduce((s,o)=>s+o.total,0),lastDate:u.orders[0]?.createdAt?new Date(u.orders[0].createdAt).toLocaleDateString('vi-VN'):'—'})));
});
export default router;
