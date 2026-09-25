import { Link, useNavigate } from "react-router-dom";
import { Minus, Plus, Trash2, ArrowRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useApp } from "../../context/AppContext";

const money = n => n.toLocaleString("vi-VN") + "₫";

export default function Cart() {
  const { cart, cartTotal, updateQty, removeFromCart } = useApp();
  const navigate = useNavigate();
  const shipping = cartTotal >= 500000 || cartTotal === 0 ? 0 : 30000;
  if (!cart.length) return <div className="empty page"><div className="empty-icon"><ShoppingBag/></div><h2>Giỏ hàng đang trống</h2><p>Hãy chọn những sản phẩm bạn yêu thích.</p><Link to="/products" className="primary-btn">Tiếp tục mua sắm <ArrowRight/></Link></div>;
  return <div className="page"><div className="container"><div className="page-title"><span className="eyebrow">YOUR CART</span><h1>Giỏ hàng</h1><p>{cart.length} sản phẩm trong giỏ hàng</p></div><div className="cart-layout"><div className="cart-list">{cart.map(item => <div className="cart-item" key={item.id}><div className="cart-thumb" style={{background:item.color}}><img src={item.image} alt={item.name} /></div><div className="cart-info"><Link to={`/products/${item.id}`}>{item.name}</Link><small>{item.brand} • {item.category}</small><b>{money(item.price)}</b></div><div className="qty"><button onClick={() => updateQty(item.id, item.qty-1)}><Minus/></button><b>{item.qty}</b><button onClick={() => updateQty(item.id, item.qty+1)}><Plus/></button></div><strong className="line-total">{money(item.price*item.qty)}</strong><button className="remove" onClick={() => removeFromCart(item.id)}><Trash2/></button></div>)}</div><aside className="summary"><h3>Tóm tắt đơn hàng</h3><div><span>Tạm tính</span><b>{money(cartTotal)}</b></div><div><span>Phí vận chuyển</span><b>{shipping ? money(shipping) : "Miễn phí"}</b></div><hr/><div className="grand"><span>Tổng cộng</span><strong>{money(cartTotal+shipping)}</strong></div><button className="primary-btn full" onClick={() => navigate("/checkout")}>Tiến hành thanh toán <ArrowRight/></button><div className="summary-note"><ShieldCheck/> Thanh toán an toàn & bảo mật</div></aside></div></div></div>;
}