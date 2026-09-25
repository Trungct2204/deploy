import { useState } from "react";
import { Search, Eye, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import AdminLayout from "../../layouts/AdminLayout";

const money = n => Number(n || 0).toLocaleString("vi-VN") + "₫";
const STATUSES = ["Chờ xác nhận", "Đang giao", "Hoàn tất", "Đã hủy"];
const statusClass = s => s === "Hoàn tất" ? "done" : s === "Đang giao" ? "shipping" : s === "Đã hủy" ? "danger" : "pending";

export default function AdminOrders() {
  const { orders, updateOrderStatus } = useApp();
  const [query, setQuery] = useState("");
  const [detail, setDetail] = useState(null);

  const filtered = orders.filter(o => (o.id + o.customer + (o.email || "")).toLowerCase().includes(query.toLowerCase()));

  return (
    <AdminLayout title="Đơn hàng">
      <div className="admin-page-head">
        <div><h1>Quản lý đơn hàng</h1><p>{orders.length} đơn hàng đã ghi nhận.</p></div>
      </div>

      <div className="admin-panel">
        <div className="table-toolbar">
          <div className="search-box"><Search/><input placeholder="Tìm theo mã đơn, khách hàng..." value={query} onChange={e => setQuery(e.target.value)} /></div>
          <span>{filtered.length} kết quả</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Ngày</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
              {filtered.map(o => (
                <tr key={o.id}>
                  <td><b>{o.id}</b></td>
                  <td><span className="customer-avatar">{o.customer?.[0] || "K"}</span>{o.customer}</td>
                  <td>{o.date}</td>
                  <td>{o.items}</td>
                  <td>{money(o.total)}</td>
                  <td>
                    <select
                      className={`status-select ${statusClass(o.status)}`}
                      value={o.status}
                      onChange={e => updateOrderStatus(o.id, e.target.value)}
                    >
                      {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td><button className="eye-btn" onClick={() => setDetail(o)} title="Xem chi tiết"><Eye/></button></td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={7} className="empty-cell">Không tìm thấy đơn hàng nào</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {detail && (
        <div className="modal-backdrop" onClick={() => setDetail(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head"><h2>Chi tiết đơn {detail.id}</h2><button onClick={() => setDetail(null)}><X/></button></div>
            <div className="order-detail">
              <p><b>Khách hàng:</b> {detail.customer}</p>
              {detail.email && <p><b>Email:</b> {detail.email}</p>}
              {detail.phone && <p><b>Điện thoại:</b> {detail.phone}</p>}
              {detail.address && <p><b>Địa chỉ:</b> {detail.address}</p>}
              <p><b>Ngày đặt:</b> {detail.date}</p>
              <p><b>Trạng thái:</b> <span className={`status ${statusClass(detail.status)}`}>{detail.status}</span></p>
              <hr/>
              <h3>Sản phẩm</h3>
              {(detail.itemsList || []).map(it => (
                <div className="checkout-product" key={it.id}>
                  <div className="checkout-product-info">
                    {it.image && <img src={it.image} alt={it.name}/>}
                    <span>{it.name} × {it.qty}</span>
                  </div>
                  <b>{money(it.price * it.qty)}</b>
                </div>
              ))}
              {!(detail.itemsList || []).length && <p style={{ color: "var(--muted)" }}>Không có chi tiết sản phẩm.</p>}
              <hr/>
              <div className="grand"><span>Tổng cộng</span><strong>{money(detail.total)}</strong></div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
