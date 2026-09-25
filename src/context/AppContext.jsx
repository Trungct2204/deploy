import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedProducts } from "../data/products";

const AppContext = createContext(null);

const read = (key, fallback) => {
  try { return JSON.parse(localStorage.getItem(key)) ?? fallback; }
  catch { return fallback; }
};

const normalizeProducts = (stored) => {
  if (!Array.isArray(stored) || stored.length === 0) return seedProducts;
  return stored.map(product => {
    const seed = seedProducts.find(item => item.id === product.id);
    return { ...seed, ...product, image: seed?.image || product.image };
  });
};

export function AppProvider({ children }) {
  const [products, setProducts] = useState(() => normalizeProducts(read("novatech_products", seedProducts)));
  const [cart, setCart] = useState(() => read("novatech_cart", []));
  const [orders, setOrders] = useState(() => read("novatech_orders", [
    { id: "NT-1001", customer: "Nguyễn Minh Anh", total: 34990000, status: "Đang giao", date: "24/09/2026", items: 1 },
    { id: "NT-1002", customer: "Trần Quốc Huy", total: 8990000, status: "Hoàn tất", date: "23/09/2026", items: 1 },
    { id: "NT-1003", customer: "Lê Hoàng Nam", total: 12990000, status: "Chờ xác nhận", date: "22/09/2026", items: 1 }
  ]));
  const [user, setUser] = useState(() => read("novatech_user", null));
  const [toast, setToast] = useState(null);

  useEffect(() => localStorage.setItem("novatech_products", JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem("novatech_cart", JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem("novatech_orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("novatech_user", JSON.stringify(user)), [user]);

  const notify = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2400);
  };

  const addToCart = (product) => {
    if (!user) {
      notify("Bạn cần đăng nhập để thêm vào giỏ hàng", "error");
      return;
    }
    setCart(prev => {
      const found = prev.find(x => x.id === product.id);
      if (found) return prev.map(x => x.id === product.id ? { ...x, qty: Math.min(x.qty + 1, product.stock) } : x);
      return [...prev, { ...product, qty: 1 }];
    });
    notify("Đã thêm sản phẩm vào giỏ hàng");
  };

  const updateQty = (id, qty) => {
    setCart(prev => prev.map(x => x.id === id ? { ...x, qty: Math.max(1, qty) } : x));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(x => x.id !== id));
    notify("Đã xóa sản phẩm khỏi giỏ");
  };

  const clearCart = () => setCart([]);

  const placeOrder = (form = {}) => {
    const total = cart.reduce((s, x) => s + x.price * x.qty, 0);
    const order = {
      id: `NT-${1000 + orders.length + 1}`,
      customer: form.name || user?.name || "Khách hàng",
      email: user?.email || form.email || "",
      phone: form.phone || "",
      address: form.address || "",
      payment: form.payment || "cod",
      total,
      status: "Chờ xác nhận",
      date: new Date().toLocaleDateString("vi-VN"),
      items: cart.reduce((s, x) => s + x.qty, 0),
      itemsList: cart.map(x => ({ id: x.id, name: x.name, image: x.image, price: x.price, qty: x.qty }))
    };
    setOrders(prev => [order, ...prev]);
    clearCart();
    notify("Đặt hàng thành công!");
    return order;
  };

  const cartCount = cart.reduce((s, x) => s + x.qty, 0);
  const cartTotal = cart.reduce((s, x) => s + x.price * x.qty, 0);

  const addProduct = (product) => {
    setProducts(prev => {
      const nextId = prev.reduce((m, p) => Math.max(m, p.id), 0) + 1;
      return [{ ...product, id: nextId }, ...prev];
    });
    notify("Đã thêm sản phẩm mới");
  };

  const updateProduct = (id, patch) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...patch } : p));
    notify("Đã cập nhật sản phẩm");
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    notify("Đã xóa sản phẩm");
  };

  const updateOrderStatus = (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
    notify("Đã cập nhật trạng thái đơn hàng");
  };

  const deleteOrder = (id) => {
    setOrders(prev => prev.filter(o => o.id !== id));
    notify("Đã xóa đơn hàng");
  };

  const value = useMemo(() => ({ products, setProducts, cart, orders, setOrders, user, setUser, toast, notify, addToCart, updateQty, removeFromCart, clearCart, placeOrder, cartCount, cartTotal, addProduct, updateProduct, deleteProduct, updateOrderStatus, deleteOrder }), [products, cart, orders, user, toast, cartCount, cartTotal]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);