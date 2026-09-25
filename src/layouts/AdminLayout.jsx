import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { LayoutDashboard, Package, ShoppingBag, Users, LogOut, Menu, X } from "lucide-react";
import { useApp } from "../context/AppContext";
import Toast from "../components/Toast";

export default function AdminLayout({ title, children }) {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const logout = () => { setUser(null); navigate("/"); };

  return (
    <div className="admin-shell">
      {open && <button className="admin-overlay show" onClick={() => setOpen(false)} aria-label="Đóng menu" />}
      <aside className={`admin-sidebar ${open ? "open" : ""}`}>
        <div className="admin-logo"><span className="logo-mark">N</span> NOVATECH <small>ADMIN</small></div>
        <nav onClick={() => setOpen(false)}>
          <NavLink to="/admin" end><LayoutDashboard/> Tổng quan</NavLink>
          <NavLink to="/admin/products"><Package/> Sản phẩm</NavLink>
          <NavLink to="/admin/orders"><ShoppingBag/> Đơn hàng</NavLink>
          <NavLink to="/admin/customers"><Users/> Khách hàng</NavLink>
        </nav>
        <div className="admin-side-bottom">
          <button onClick={logout}><LogOut/> Đăng xuất</button>
        </div>
      </aside>
      <div className="admin-content">
        <div className="admin-mobile-top">
          <button onClick={() => setOpen(true)}><Menu/></button>
          <span>NovaTech Admin</span>
        </div>
        <div className="admin-topbar">
          <div><span className="eyebrow">ADMIN PANEL</span><h2>{title}</h2></div>
          <div className="admin-user" title={user?.email}><span>{user?.name}</span>{user?.name?.[0] || "A"}</div>
        </div>
        {children}
      </div>
      <Toast/>
    </div>
  );
}
