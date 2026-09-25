import { Link, useLocation, useNavigate } from "react-router-dom";
import { LockKeyhole, Mail, ShieldCheck, UserRound } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

export default function Login() {
  const { setUser, notify } = useApp();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const submit = e => {
    e.preventDefault();
    const isAdmin = email.trim().toLowerCase().includes("admin");
    const user = isAdmin
      ? { name: "Quản trị viên", email: email || "admin@novatech.vn", role: "admin" }
      : { name: "Nguyễn Minh Anh", email: email || "hello@novatech.vn", role: "customer" };
    setUser(user);
    notify("Đăng nhập thành công");
    navigate(isAdmin ? "/admin" : (location.state?.from || "/"));
  };
  return <div className="auth-page"><div className="auth-art"><div className="auth-logo">N</div><h1>Công nghệ<br/><em>không giới hạn.</em></h1><p>Mua sắm thiết bị công nghệ chính hãng với trải nghiệm NovaTech.</p></div><div className="auth-box"><div className="auth-form"><Link to="/" className="auth-brand"><span className="logo-mark">N</span> NOVATECH</Link><span className="eyebrow">WELCOME BACK</span><h2>Chào mừng trở lại</h2><p>Đăng nhập để tiếp tục mua sắm.</p><form onSubmit={submit}><label>Email<input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" required/></label><label>Mật khẩu<input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••••" required/></label><div className="form-extra"><label className="check"><input type="checkbox"/> Ghi nhớ đăng nhập</label><a>Quên mật khẩu?</a></div><button className="primary-btn full">Đăng nhập</button></form><p className="auth-bottom">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p><small className="demo-hint">Mẹo: dùng email chứa "admin" (vd admin@novatech.vn) để vào trang quản trị.</small></div></div></div>;
}