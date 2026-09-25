import { Link } from "react-router-dom";
import { Wallet, ShoppingBag, Package, Users, ArrowUpRight } from "lucide-react";
import { useApp } from "../../context/AppContext";
import AdminLayout from "../../layouts/AdminLayout";

const money = n => n.toLocaleString("vi-VN") + "₫";

export default function Dashboard() {
  const { products, orders } = useApp();

  const revenue = orders.reduce((s, o) => s + o.total, 0);
  const avgOrderValue = orders.length ? Math.round(revenue / orders.length) : 0;
  const pendingCount = orders.filter(o => o.status === "Chờ xác nhận").length;
  const customerCount = new Set(orders.map(o => o.email || o.customer)).size;
  const repeatCustomers = Object.values(
    orders.reduce((acc, o) => { const k = o.email || o.customer; acc[k] = (acc[k] || 0) + 1; return acc; }, {})
  ).filter(n => n > 1).length;
  const lowStock = products.filter(p => p.stock <= 8).length;

  const chartData = orders.slice(0, 7).slice().reverse();
  const maxTotal = Math.max(1, ...chartData.map(o => o.total));

  const topProducts = products.slice().sort((a, b) => b.rating - a.rating).slice(0, 5);

  const statusClass = s => s === "Hoàn tất" ? "done" : s === "Đang giao" ? "shipping" : s === "Đã hủy" ? "cancelled" : "pending";

  return (
    <AdminLayout title="Tổng quan">
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-top"><span>Tổng doanh thu</span><Wallet/></div>
          <strong>{money(revenue)}</strong>
          <small>Trung bình {money(avgOrderValue)} / đơn</small>
        </div>
        <div className="stat-card">
          <div className="stat-top"><span>Tổng đơn hàng</span><ShoppingBag/></div>
          <strong>{orders.length}</strong>
          <small>{pendingCount} đơn đang chờ xác nhận</small>
        </div>
        <div className="stat-card">
          <div className="stat-top"><span>Sản phẩm</span><Package/></div>
          <strong>{products.length}</strong>
          <small>{lowStock} sản phẩm sắp hết hàng</small>
        </div>
        <div className="stat-card">
          <div className="stat-top"><span>Khách hàng</span><Users/></div>
          <strong>{customerCount}</strong>
          <small>{repeatCustomers} khách mua từ 2 đơn trở lên</small>
        </div>
      </div>

      <div className="admin-grid">
        <div className="admin-panel">
          <div className="panel-head"><h3>Doanh thu theo đơn hàng gần đây</h3></div>
          <div className="chart">
            <div className="chart-bars">
              {chartData.length === 0 && <div className="empty-cell">Chưa có dữ liệu</div>}
              {chartData.map(o => (
                <div key={o.id}>
                  <span style={{ height: `${Math.max(8, (o.total / maxTotal) * 170)}px` }} />
                  <small>{o.id.replace("NT-", "")}</small>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="admin-panel">
          <div className="panel-head"><h3>Đơn hàng gần đây</h3></div>
          <div className="mini-orders">
            {orders.slice(0, 5).map(o => (
              <div key={o.id}>
                <div className="mini-avatar">{o.customer?.[0] || "K"}</div>
                <div><b>{o.customer}</b><small>{o.id} • {o.date}</small></div>
                <strong>{money(o.total)}</strong>
              </div>
            ))}
            {orders.length === 0 && <div className="empty-cell">Chưa có đơn hàng</div>}
          </div>
        </div>
      </div>

      <div className="admin-panel top-products">
        <div className="panel-head"><h3>Sản phẩm nổi bật</h3><Link to="/admin/products" className="view-all">Xem tất cả <ArrowUpRight/></Link></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Sản phẩm</th><th>Danh mục</th><th>Giá</th><th>Tồn kho</th><th>Đánh giá</th></tr></thead>
            <tbody>
              {topProducts.map(p => (
                <tr key={p.id}>
                  <td><span className="table-product"><img src={p.image} alt={p.name}/></span>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{money(p.price)}</td>
                  <td className={p.stock <= 8 ? "stock-low" : "stock-ok"}>{p.stock}</td>
                  <td>{p.rating} ★</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
