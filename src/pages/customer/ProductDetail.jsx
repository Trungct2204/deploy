import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { useState } from "react";
import { useApp } from "../../context/AppContext";

const money = n => Number(n || 0).toLocaleString("vi-VN") + "₫";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, user } = useApp();
  const product = products.find(p => String(p.id) === id);
  const [qty, setQty] = useState(1);
  const [liked, setLiked] = useState(false);
  if (!product) return <div className="empty page"><h2>Không tìm thấy sản phẩm</h2><Link to="/products" className="primary-btn">Quay lại cửa hàng</Link></div>;
  const buy = () => { if (!user) { addToCart(product); return; } for(let i=0;i<qty;i++) addToCart(product); navigate("/cart"); };
  return <div className="page"><div className="container"><Link to="/products" className="back-link"><ArrowLeft/> Quay lại sản phẩm</Link>
    <div className="detail-grid"><div className="detail-visual" style={{background: product.color}}><span className="badge">{product.badge}</span><div className="detail-image"><img src={product.image} alt={product.name} /></div></div>
    <div className="detail-info"><span className="product-brand">{product.brand}</span><h1>{product.name}</h1><div className="detail-rating"><span><Star fill="currentColor"/> {product.rating}</span> <span>128 đánh giá</span><span>•</span><span>Đã bán 1.2K</span></div><div className="detail-price">{money(product.price)} {product.oldPrice > product.price && <del>{money(product.oldPrice)}</del>}</div><p className="detail-desc">{product.description}</p>
    <div className="detail-stock">✓ Còn {product.stock} sản phẩm</div><div className="qty-row"><div className="qty"><button onClick={() => setQty(Math.max(1, qty-1))}><Minus/></button><b>{qty}</b><button onClick={() => setQty(Math.min(product.stock, qty+1))}><Plus/></button></div><button className={`wishlist ${liked ? "active" : ""}`} onClick={() => setLiked(!liked)}><Heart fill={liked ? "currentColor" : "none"}/></button></div>
    <div className="detail-actions"><button className="secondary-buy" onClick={() => addToCart(product)}><ShoppingCart/> Thêm vào giỏ</button><button className="primary-btn" onClick={buy}>Mua ngay</button></div>
    <div className="detail-benefits"><div><ShieldCheck/><span><b>Chính hãng</b><small>Bảo hành chính hãng</small></span></div><div><Truck/><span><b>Giao nhanh</b><small>Nhận hàng 1–3 ngày</small></span></div><div><RotateCcw/><span><b>Đổi trả</b><small>30 ngày miễn phí</small></span></div></div>
    </div></div></div></div>;
}