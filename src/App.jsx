import { Navigate, Route, Routes } from "react-router-dom";
import CustomerLayout from "./layouts/CustomerLayout";
import Home from "./pages/customer/Home";
import Products from "./pages/customer/Products";
import ProductDetail from "./pages/customer/ProductDetail";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import Login from "./pages/customer/Login";
import Register from "./pages/customer/Register";
import Profile from "./pages/customer/Profile";
import Orders from "./pages/customer/Orders";
import About from "./pages/customer/About";
import Contact from "./pages/customer/Contact";
import { useApp } from "./context/AppContext";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminProducts from "./pages/admin/Products";
import AdminOrders from "./pages/admin/Orders";
import AdminCustomers from "./pages/admin/Customers";

function BlockAdminOnCustomerSite({ children }) {
  const { user } = useApp();
  if (user?.role === "admin") return <Navigate to="/admin" replace/>;
  return children;
}

function CustomerRoutes(){return <BlockAdminOnCustomerSite><CustomerLayout><Routes><Route path="/" element={<Home/>}/><Route path="/products" element={<Products/>}/><Route path="/products/:id" element={<ProductDetail/>}/><Route path="/cart" element={<Cart/>}/><Route path="/checkout" element={<Checkout/>}/><Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/><Route path="/profile" element={<Profile/>}/><Route path="/orders" element={<Orders/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Navigate to="/" replace/>}/></Routes></CustomerLayout></BlockAdminOnCustomerSite>}

function RequireAdmin({ children }) {
  const { user } = useApp();
  if (!user) return <Navigate to="/login" replace/>;
  if (user.role !== "admin") return <Navigate to="/" replace/>;
  return children;
}

function AdminRoutes(){return <Routes>
  <Route path="/" element={<RequireAdmin><AdminDashboard/></RequireAdmin>}/>
  <Route path="/products" element={<RequireAdmin><AdminProducts/></RequireAdmin>}/>
  <Route path="/orders" element={<RequireAdmin><AdminOrders/></RequireAdmin>}/>
  <Route path="/customers" element={<RequireAdmin><AdminCustomers/></RequireAdmin>}/>
  <Route path="*" element={<Navigate to="/admin" replace/>}/>
</Routes>}

export default function App(){return <Routes><Route path="/admin/*" element={<AdminRoutes/>}/><Route path="*" element={<CustomerRoutes/>}/></Routes>}