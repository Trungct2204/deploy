import { Link } from "react-router-dom";
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return <footer className="footer">
    <div className="container footer-grid">
      <div><div className="logo footer-logo"><span className="logo-mark">N</span><span>NOVA<span>TECH</span></span></div><p>Thiết bị công nghệ chính hãng, trải nghiệm mua sắm hiện đại và dịch vụ tận tâm.</p><div className="socials"><a><Facebook/></a><a><Instagram/></a><a><Youtube/></a></div></div>
      <div><h4>Sản phẩm</h4><Link to="/products?category=Điện thoại">Điện thoại</Link><Link to="/products?category=Laptop">Laptop</Link><Link to="/products?category=Tai nghe">Tai nghe</Link><Link to="/products?category=Phụ kiện">Phụ kiện</Link></div>
      <div><h4>Hỗ trợ</h4><Link to="/orders">Theo dõi đơn hàng</Link><Link to="/cart">Giỏ hàng</Link><Link to="/profile">Tài khoản</Link><Link to="/login">Đăng nhập</Link></div>
      <div><h4>Liên hệ</h4><span><MapPin/> 123 Nguyễn Văn Linh, Đà Nẵng</span><span><Phone/> 1900 6868</span><span><Mail/> hello@novatech.vn</span></div>
    </div>
    <div className="footer-bottom">© 2026 NovaTech. All rights reserved.</div>
  </footer>;
}