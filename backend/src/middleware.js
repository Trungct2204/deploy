import jwt from 'jsonwebtoken';
import { prisma } from './db.js';

export async function authenticate(req, res, next) {
  try {
    const token = req.headers.authorization?.replace(/^Bearer\s+/i, '');
    if (!token) return res.status(401).json({ message: 'Vui lòng đăng nhập.' });
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await prisma.user.findUnique({ where: { id: Number(payload.sub) } });
    if (!user) return res.status(401).json({ message: 'Tài khoản không tồn tại.' });
    req.user = user;
    next();
  } catch { return res.status(401).json({ message: 'Phiên đăng nhập không hợp lệ hoặc đã hết hạn.' }); }
}

export function requireAdmin(req, res, next) {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Bạn không có quyền thực hiện thao tác này.' });
  next();
}
