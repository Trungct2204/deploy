import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, UserRound, LogOut, Menu, X, LayoutDashboard } from "lucide-react";
import { useApp } from "../context/AppContext";
import { useState } from "react";

export default function Header() {
  const { cartCount, user, setUser } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const logout = () => { setUser(null); navigate("/"); };

  return (
    <header className="header">
      <div className="container header-inner">
        <button className="mobile-menu" onClick={() => setOpen(!open)}>{open ? <X/> : <Menu/>}</button>
        <Link to="/" className="logo"><span className="logo-mark">N</span><span>NOVA<span>TECH</span></span></Link>
        <nav className={`nav ${open ? "show" : ""}`}>
          <NavLink to="/" onClick={() => setOpen(false)}>Trang chủ</NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>Sản phẩm</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)}>Về chúng tôi</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)}>Liên hệ</NavLink>
        </nav>
        <div className="header-actions">
          <Link className="icon-btn" to="/products"><Search/></Link>
          <Link className="icon-btn cart-icon" to="/cart"><ShoppingCart/><b>{cartCount}</b></Link>
          {user ? (
            <div className="user-menu">
              {user.role === "admin" && <Link className="admin-shortcut" to="/admin" title="Trang quản trị"><LayoutDashboard/></Link>}
              <Link className="profile-mini" to="/profile"><UserRound/><span>{user.name}</span></Link>
              <button className="logout-btn" onClick={logout}><LogOut/></button>
            </div>
          ) : <Link className="icon-btn" to="/login" title="Đăng nhập"><UserRound/></Link>}
        </div>
      </div>
    </header>
  );
}