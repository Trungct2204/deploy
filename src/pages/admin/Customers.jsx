import { useEffect, useState } from "react";
import { Search, Mail } from "lucide-react";
import { api } from "../../lib/api";
import AdminLayout from "../../layouts/AdminLayout";

const money = n => Number(n || 0).toLocaleString("vi-VN") + "₫";

export default function AdminCustomers() {
  const [query, setQuery] = useState("");
  const [customers, setCustomers] = useState([]);
  useEffect(() => { api('/admin/customers').then(setCustomers).catch(error => console.error('Load customers:', error)); }, []);

  const filtered = customers.filter(c => (c.name + c.email).toLowerCase().includes(query.toLowerCase()));

  return (
    <AdminLayout title="Khách hàng">
      <div className="admin-page-head">
        <div><h1>Khách hàng</h1><p>{customers.length} tài khoản khách hàng.</p></div>
      </div>

      <div className="admin-panel">
        <div className="table-toolbar">
          <div className="search-box"><Search/><input placeholder="Tìm khách hàng..." value={query} onChange={e => setQuery(e.target.value)} /></div>
          <span>{filtered.length} kết quả</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Khách hàng</th><th>Liên hệ</th><th>Số đơn</th><th>Tổng chi tiêu</th><th>Đơn gần nhất</th></tr></thead>
            <tbody>
              {filtered.map(c => (
                <tr key={c.email + c.name}>
                  <td><span className="customer-avatar">{c.name?.[0] || "K"}</span>{c.name}</td>
                  <td className="contact-cell">{c.email !== "—" && <span><Mail/> {c.email}</span>}</td>
                  <td>{c.orders}</td>
                  <td>{money(c.total)}</td>
                  <td>{c.lastDate}</td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={5} className="empty-cell">Không tìm thấy khách hàng nào</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
