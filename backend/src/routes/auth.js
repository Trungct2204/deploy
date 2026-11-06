import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../db.js';
import { authenticate } from '../middleware.js';
const router = Router();
const publicUser = u => ({ id:u.id, name:u.name, email:u.email, phone:u.phone, address:u.address, role:u.role });
const issueToken = u => jwt.sign({ sub:String(u.id), role:u.role }, process.env.JWT_SECRET, { expiresIn:process.env.JWT_EXPIRES_IN || '7d' });

router.post('/register', async (req,res) => {
  try {
    const { name, email, password } = req.body || {};
    if (!name?.trim() || !email?.trim() || !password || password.length < 6) return res.status(400).json({message:'Vui lòng nhập đủ họ tên, email và mật khẩu tối thiểu 6 ký tự.'});
    const normalizedEmail = email.trim().toLowerCase();
    if (await prisma.user.findUnique({where:{email:normalizedEmail}})) return res.status(409).json({message:'Email đã được sử dụng.'});
    const user = await prisma.user.create({data:{name:name.trim(),email:normalizedEmail,passwordHash:await bcrypt.hash(password,12)}});
    res.status(201).json({token:issueToken(user),user:publicUser(user)});
  } catch (e) { res.status(500).json({message:'Không thể tạo tài khoản.'}); }
});

router.post('/login', async (req,res) => {
  const { email, password } = req.body || {};
  if (!email || !password) return res.status(400).json({message:'Vui lòng nhập email và mật khẩu.'});
  const user = await prisma.user.findUnique({where:{email:email.trim().toLowerCase()}});
  if (!user || !(await bcrypt.compare(password,user.passwordHash))) return res.status(401).json({message:'Email hoặc mật khẩu không chính xác.'});
  res.json({token:issueToken(user),user:publicUser(user)});
});

router.get('/me', authenticate, (req,res) => res.json({user:publicUser(req.user)}));
router.patch('/me', authenticate, async (req,res) => {
  const {name,phone,address}=req.body || {};
  const user=await prisma.user.update({where:{id:req.user.id},data:{...(name!==undefined?{name}:{}),...(phone!==undefined?{phone}:{}),...(address!==undefined?{address}:{})}});
  res.json({user:publicUser(user)});
});
export default router;
