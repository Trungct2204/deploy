import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

export default function Register() {
  const { setUser, notify } = useApp();
  const navigate = useNavigate();
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [password,setPassword]=useState("");
  const submit=e=>{e.preventDefault();setUser({name,email,role:"customer"});notify("Tạo tài khoản thành công");navigate("/")};
  return <div className="auth-page"><div className="auth-art"><div className="auth-logo">N</div><h1>Bắt đầu<br/><em>hành trình mới.</em></h1><p>Tạo tài khoản NovaTech để lưu sản phẩm, quản lý đơn hàng và nhận ưu đãi.</p></div><div className="auth-box"><div className="auth-form"><Link to="/" className="auth-brand"><span className="logo-mark">N</span> NOVATECH</Link><span className="eyebrow">CREATE ACCOUNT</span><h2>Tạo tài khoản</h2><p>Tham gia NovaTech ngay hôm nay.</p><form onSubmit={submit}><label>Họ và tên<input required value={name} onChange={e=>setName(e.target.value)} placeholder="Nguyễn Văn A"/></label><label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com"/></label><label>Mật khẩu<input required minLength="6" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Tối thiểu 6 ký tự"/></label><button className="primary-btn full">Tạo tài khoản</button></form><p className="auth-bottom">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p></div></div></div>;
}