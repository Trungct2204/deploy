import { Package, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../../context/AppContext";

const money=n=>n.toLocaleString("vi-VN")+"₫";
export default function Orders(){
 const {orders,user}=useApp();
 if(!user)return <div className="empty page"><Package/><h2>Đăng nhập để xem đơn hàng</h2><Link to="/login" className="primary-btn">Đăng nhập</Link></div>;
 const mine = orders.filter(o=>o.email? o.email===user.email : o.customer===user.name);
 if(!mine.length) return <div className="empty page"><Package/><h2>Bạn chưa có đơn hàng nào</h2><Link to="/products" className="primary-btn">Mua sắm ngay</Link></div>;
 return <div className="page"><div className="container narrow"><div className="page-title"><span className="eyebrow">ORDERS</span><h1>Đơn hàng của tôi</h1><p>Theo dõi trạng thái các đơn hàng.</p></div><div className="order-list">{mine.map(o=><div className="order-card" key={o.id}><div className="order-icon"><Package/></div><div><b>{o.id}</b><span>{o.date} • {o.items} sản phẩm</span></div><strong>{money(o.total)}</strong><span className={`status ${o.status==="Hoàn tất"?"done":o.status==="Đang giao"?"shipping":"pending"}`}>{o.status}</span><ChevronRight/></div>)}</div></div></div>;
}