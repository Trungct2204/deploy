import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle2, CreditCard, MapPin, Truck } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { useState } from "react";

const money = n => n.toLocaleString("vi-VN") + "₫";

export default function Checkout() {
  const { cart, cartTotal, placeOrder, user } = useApp();
  const navigate = useNavigate();
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({name:user?.name||"", phone:"", address:"", payment:"cod"});
  if (!cart.length && !done) return <div className="empty page"><h2>Không có sản phẩm để thanh toán</h2><Link to="/products" className="primary-btn">Mua sắm ngay</Link></div>;
  if (done) return <div className="empty page success-page"><CheckCircle2/><h2>Đặt hàng thành công!</h2><p>Cảm ơn bạn đã mua sắm tại NovaTech.</p><Link to="/orders" className="primary-btn">Xem đơn hàng</Link></div>;
  const submit = e => { e.preventDefault(); placeOrder(form); setDone(true); };
  return <div className="page"><div className="container checkout"><Link to="/cart" className="back-link"><ArrowLeft/> Quay lại giỏ hàng</Link><div className="checkout-grid"><form className="checkout-form" onSubmit={submit}><div className="checkout-card"><h3><MapPin/> Thông tin giao hàng</h3><div className="form-grid"><label>Họ và tên<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Nguyễn Văn A"/></label><label>Số điện thoại<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} placeholder="0901 234 567"/></label><label className="full-field">Địa chỉ nhận hàng<input required value={form.address} onChange={e=>setForm({...form,address:e.target.value})} placeholder="Số nhà, đường, phường/xã, tỉnh/thành"/></label></div></div><div className="checkout-card"><h3><CreditCard/> Phương thức thanh toán</h3><label className={`payment-option ${form.payment==="cod"?"selected":""}`}><input type="radio" checked={form.payment==="cod"} onChange={()=>setForm({...form,payment:"cod"})}/> <span><b>Thanh toán khi nhận hàng</b><small>Thanh toán bằng tiền mặt khi nhận hàng</small></span></label><label className={`payment-option ${form.payment==="bank"?"selected":""}`}><input type="radio" checked={form.payment==="bank"} onChange={()=>setForm({...form,payment:"bank"})}/> <span><b>Chuyển khoản ngân hàng</b><small>Thông tin thanh toán sẽ hiển thị sau khi đặt hàng</small></span></label></div></form><aside className="summary"><h3>Đơn hàng của bạn</h3>{cart.map(x=><div className="checkout-product" key={x.id}><span className="checkout-product-info"><img src={x.image} alt={x.name} /> {x.name} × {x.qty}</span><b>{money(x.price*x.qty)}</b></div>)}<hr/><div><span>Tạm tính</span><b>{money(cartTotal)}</b></div><div><span>Vận chuyển</span><b>Miễn phí</b></div><div className="grand"><span>Tổng</span><strong>{money(cartTotal)}</strong></div><button className="primary-btn full" onClick={submit}><Truck/> Đặt hàng</button></aside></div></div></div>;
}