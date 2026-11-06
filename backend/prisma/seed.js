import 'dotenv/config';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
import { seedProducts } from '../../src/data/products.js';
const prisma=new PrismaClient();
try{
  for(const p of seedProducts){const { id, ...data } = p; await prisma.product.upsert({where:{id},update:{},create:data});}
  const email='admin@novatech.vn';
  await prisma.user.upsert({where:{email},update:{},create:{name:'Quản trị viên',email,passwordHash:await bcrypt.hash('Admin@123',12),role:'admin'}});
  await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"Product"','id'), (SELECT MAX(id) FROM "Product"))`);
  console.log('Seed hoàn tất. Admin: admin@novatech.vn / Admin@123');
}catch(e){console.error(e);process.exitCode=1}finally{await prisma.$disconnect()}
