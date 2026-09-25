import { UserRound, Mail, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

export default function Profile() {
  const { user } = useApp();
  if (!user) return <div className="empty page"><h2>Bạn chưa đăng nhập</h2><Link to="/login" className="primary-btn">Đăng nhập</Link></div>;
  return <div className="page"><div className="container narrow"><div className="page-title"><span className="eyebrow">ACCOUNT</span><h1>Hồ sơ cá nhân</h1></div><div className="profile-card"><div className="profile-avatar">{user.name?.[0] || "U"}</div><div><h2>{user.name}</h2><p><Mail/> {user.email}</p><span className="role-pill"><ShieldCheck/> Khách hàng</span></div></div><div className="profile-links"><Link to="/orders">📦 Đơn hàng của tôi</Link><Link to="/cart">🛒 Giỏ hàng</Link></div></div></div>;
}