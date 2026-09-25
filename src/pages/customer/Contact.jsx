import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

export default function Contact() {
  const { notify } = useApp();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = e => {
    e.preventDefault();
    notify("Đã gửi yêu cầu, NovaTech sẽ liên hệ lại sớm!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="page">
      <div className="container">
        <div className="page-title">
          <span className="eyebrow">LIÊN HỆ</span>
          <h1>Liên hệ với chúng tôi</h1>
          <p>Có câu hỏi về sản phẩm hay đơn hàng? Gửi cho NovaTech, đội ngũ sẽ phản hồi trong 24 giờ.</p>
        </div>
        <div className="checkout-grid">
          <form className="checkout-card checkout-form" onSubmit={submit}>
            <label>Họ tên
              <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nguyễn Văn A"/>
            </label>
            <label>Email
              <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"/>
            </label>
            <label>Nội dung
              <textarea required rows="5" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Bạn cần hỗ trợ gì?"/>
            </label>
            <button className="primary-btn full"><Send size={15}/> Gửi liên hệ</button>
          </form>
          <div className="contact-info">
            <div className="contact-info-item"><MapPin/><div><b>Địa chỉ</b><span>123 Nguyễn Văn Linh, Đà Nẵng</span></div></div>
            <div className="contact-info-item"><Phone/><div><b>Hotline</b><span>1900 6868</span></div></div>
            <div className="contact-info-item"><Mail/><div><b>Email</b><span>hello@novatech.vn</span></div></div>
            <div className="contact-info-item"><Clock/><div><b>Giờ làm việc</b><span>8:00 – 21:00, Thứ 2 – Chủ nhật</span></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}