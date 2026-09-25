import { useState } from "react";
import { Plus, Search, Pencil, Trash2, X } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { categories } from "../../data/products";
import AdminLayout from "../../layouts/AdminLayout";

const money = n => Number(n || 0).toLocaleString("vi-VN") + "₫";
const emptyForm = { name: "", category: categories[1], brand: "", price: "", oldPrice: "", stock: "", rating: 4.5, image: "", emoji: "📦", badge: "", description: "" };

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useApp();
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(null); // { mode: "add" | "edit", data }
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = products.filter(p => (p.name + p.category + p.brand).toLowerCase().includes(query.toLowerCase()));

  const openAdd = () => { setForm(emptyForm); setModal({ mode: "add" }); };
  const openEdit = p => { setForm({ ...p }); setModal({ mode: "edit", id: p.id }); };
  const closeModal = () => setModal(null);

  const submit = e => {
    e.preventDefault();
    const price = Number(form.price) || 0;
    const oldPrice = Number(form.oldPrice) || 0;
    const payload = { ...form, price, oldPrice: oldPrice > price ? oldPrice : 0, stock: Number(form.stock) || 0, rating: Number(form.rating) || 4.5 };
    if (modal.mode === "add") addProduct(payload);
    else updateProduct(modal.id, payload);
    closeModal();
  };

  return (
    <AdminLayout title="Sản phẩm">
      <div className="admin-page-head">
        <div><h1>Quản lý sản phẩm</h1><p>{products.length} sản phẩm trong kho.</p></div>
        <button className="primary-btn" onClick={openAdd}><Plus/> Thêm sản phẩm</button>
      </div>

      <div className="admin-panel">
        <div className="table-toolbar">
          <div className="search-box"><Search/><input placeholder="Tìm sản phẩm..." value={query} onChange={e => setQuery(e.target.value)} /></div>
          <span>{filtered.length} kết quả</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Sản phẩm</th><th>Danh mục</th><th>Thương hiệu</th><th>Giá</th><th>Tồn kho</th><th>Hành động</th></tr></thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}>
                  <td><span className="table-product"><img src={p.image} alt={p.name}/></span>{p.name}<small>{p.badge}</small></td>
                  <td>{p.category}</td>
                  <td>{p.brand}</td>
                  <td>{money(p.price)}</td>
                  <td className={p.stock <= 8 ? "stock-low" : "stock-ok"}>{p.stock}</td>
                  <td>
                    <div className="row-actions">
                      <button onClick={() => openEdit(p)} title="Sửa"><Pencil/></button>
                      <button className="danger" onClick={() => setConfirmDelete(p)} title="Xóa"><Trash2/></button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && <tr><td colSpan={6} className="empty-cell">Không tìm thấy sản phẩm nào</td></tr>}
            </tbody>
          </table>
        </div>
      </div>

      {modal && (
        <div className="modal-backdrop" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head"><h2>{modal.mode === "add" ? "Thêm sản phẩm" : "Sửa sản phẩm"}</h2><button onClick={closeModal}><X/></button></div>
            <form onSubmit={submit} className="checkout-form">
              <div className="form-grid">
                <label className="full-field">Tên sản phẩm<input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} /></label>
                <label>Danh mục
                  <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
                    {categories.filter(c => c !== "Tất cả").map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </label>
                <label>Thương hiệu<input required value={form.brand} onChange={e => setForm({ ...form, brand: e.target.value })} /></label>
                <label>Giá (₫)<input type="number" min="0" required value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} /></label>
                <label>Giá cũ (₫, không bắt buộc)<input type="number" min="0" value={form.oldPrice} onChange={e => setForm({ ...form, oldPrice: e.target.value })} placeholder="Để trống nếu không giảm giá" /></label>
                <label>Tồn kho<input type="number" min="0" required value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} /></label>
                <label>Nhãn (badge)<input value={form.badge} onChange={e => setForm({ ...form, badge: e.target.value })} placeholder="Mới, Hot, Sale..." /></label>
                <label>Emoji<input value={form.emoji} onChange={e => setForm({ ...form, emoji: e.target.value })} /></label>
                <label className="full-field">Ảnh (URL)<input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." /></label>
                <label className="full-field">Mô tả<textarea rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} /></label>
              </div>
              <div className="modal-actions">
                <button type="button" className="secondary-btn" onClick={closeModal}>Hủy</button>
                <button type="submit" className="primary-btn">{modal.mode === "add" ? "Thêm sản phẩm" : "Lưu thay đổi"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDelete && (
        <div className="modal-backdrop" onClick={() => setConfirmDelete(null)}>
          <div className="modal" onClick={e => e.stopPropagation()} style={{ width: "min(420px,100%)" }}>
            <div className="modal-head"><h2>Xóa sản phẩm</h2><button onClick={() => setConfirmDelete(null)}><X/></button></div>
            <p className="confirm-text">Bạn có chắc muốn xóa <b>{confirmDelete.name}</b>? Hành động này không thể hoàn tác.</p>
            <div className="modal-actions">
              <button className="secondary-btn" onClick={() => setConfirmDelete(null)}>Hủy</button>
              <button className="primary-btn" style={{ background: "#dc2626" }} onClick={() => { deleteProduct(confirmDelete.id); setConfirmDelete(null); }}>Xóa sản phẩm</button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}