import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { seedProducts } from "../data/products";
import { api, getToken, setToken } from "../lib/api";

const AppContext = createContext(null);
const read = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };

export function AppProvider({ children }) {
  const [products, setProducts] = useState(seedProducts);
  const [cart, setCart] = useState(() => read("novatech_cart", []));
  const [orders, setOrders] = useState([]);
  const [user, setUserState] = useState(() => read("novatech_user", null));
  const [toast, setToast] = useState(null);
  const [backendReady, setBackendReady] = useState(false);

  const notify = (message, type = "success") => { setToast({ message, type }); setTimeout(() => setToast(null), 2400); };
  const setUser = next => { setUserState(next); if (next) localStorage.setItem("novatech_user", JSON.stringify(next)); else { setToken(null); localStorage.removeItem("novatech_user"); setOrders([]); setCart([]); } };

  const refreshProducts = async () => { const rows = await api('/products'); setProducts(rows); return rows; };
  const refreshOrders = async () => { if (!getToken()) { setOrders([]); return []; } const rows = await api('/orders'); setOrders(rows); return rows; };

  useEffect(() => {
    let active = true;
    api('/products').then(rows => { if (active) { setProducts(rows); setBackendReady(true); } }).catch(err => { console.error('Backend products:', err); if (active) notify('Chưa kết nối được Backend. Đang hiển thị dữ liệu mẫu.', 'error'); });
    if (getToken()) {
      api('/auth/me').then(({ user: current }) => { if (active) { setUserState(current); localStorage.setItem('novatech_user', JSON.stringify(current)); return refreshOrders(); } }).catch(() => { setToken(null); localStorage.removeItem('novatech_user'); if (active) setUserState(null); });
    } else {
      localStorage.removeItem('novatech_user');
      setUserState(null);
    }
    return () => { active = false; };
  }, []);

  useEffect(() => localStorage.setItem("novatech_cart", JSON.stringify(cart)), [cart]);

  const login = async (email, password) => {
    const result = await api('/auth/login', { method:'POST', body:{ email, password } });
    setToken(result.token); setUser(result.user); await refreshOrders(); return result.user;
  };
  const register = async (name, email, password) => {
    const result = await api('/auth/register', { method:'POST', body:{ name, email, password } });
    setToken(result.token); setUser(result.user); setOrders([]); return result.user;
  };
  const logout = () => { setToken(null); setUser(null); setOrders([]); setCart([]); };

  const addToCart = product => {
    if (!user) { notify("Bạn cần đăng nhập để thêm vào giỏ hàng", "error"); return; }
    setCart(prev => { const found=prev.find(x=>x.id===product.id); if(found) return prev.map(x=>x.id===product.id?{...x,qty:Math.min(x.qty+1,product.stock)}:x); return [...prev,{...product,qty:1}]; });
    notify("Đã thêm sản phẩm vào giỏ hàng");
  };
  const updateQty = (id,qty) => setCart(prev=>prev.map(x=>x.id===id?{...x,qty:Math.max(1,Math.min(Number(qty)||1,x.stock||999))}:x));
  const removeFromCart = id => { setCart(prev=>prev.filter(x=>x.id!==id)); notify("Đã xóa sản phẩm khỏi giỏ"); };
  const clearCart = () => setCart([]);
  const placeOrder = async form => {
    const order = await api('/orders',{method:'POST',body:{name:form.name,phone:form.phone,address:form.address,payment:form.payment,items:cart.map(x=>({productId:x.id,qty:x.qty}))}});
    setOrders(prev=>[order,...prev]); clearCart(); await refreshProducts(); notify('Đặt hàng thành công!'); return order;
  };
  const addProduct = async product => { const created=await api('/products',{method:'POST',body:product}); setProducts(prev=>[created,...prev]); notify('Đã thêm sản phẩm mới'); };
  const updateProduct = async (id,patch) => { const updated=await api(`/products/${id}`,{method:'PATCH',body:patch}); setProducts(prev=>prev.map(p=>p.id===id?updated:p)); notify('Đã cập nhật sản phẩm'); };
  const deleteProduct = async id => { await api(`/products/${id}`,{method:'DELETE'}); setProducts(prev=>prev.filter(p=>p.id!==id)); notify('Đã xóa sản phẩm'); };
  const updateOrderStatus = async (id,status) => { const updated=await api(`/orders/${encodeURIComponent(id)}/status`,{method:'PATCH',body:{status}}); setOrders(prev=>prev.map(o=>o.id===id?updated:o)); notify('Đã cập nhật trạng thái đơn hàng'); };
  const deleteOrder = id => setOrders(prev=>prev.filter(o=>o.id!==id));

  const cartCount=cart.reduce((s,x)=>s+x.qty,0), cartTotal=cart.reduce((s,x)=>s+x.price*x.qty,0);
  const value=useMemo(()=>({products,setProducts,cart,orders,setOrders,user,setUser,toast,notify,addToCart,updateQty,removeFromCart,clearCart,placeOrder,cartCount,cartTotal,addProduct,updateProduct,deleteProduct,updateOrderStatus,deleteOrder,login,register,logout,refreshProducts,refreshOrders,backendReady}),[products,cart,orders,user,toast,cartCount,cartTotal,backendReady]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
export const useApp=()=>useContext(AppContext);
