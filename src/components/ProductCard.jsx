import { Heart, ShoppingCart, Star, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useState } from "react";

const money = n => Number(n || 0).toLocaleString("vi-VN") + "₫";

export default function ProductCard({ product }) {
  const { addToCart } = useApp();
  const [liked, setLiked] = useState(false);
  return <article className="product-card">
    <div className="product-visual" style={{ background: product.color }}>
      <span className="badge">{product.badge}</span>
      <button className={`heart ${liked ? "liked" : ""}`} onClick={() => setLiked(!liked)}><Heart fill={liked ? "currentColor" : "none"}/></button>
      <Link to={`/products/${product.id}`} className="product-image"><img src={product.image} alt={product.name} loading="lazy" /></Link>
      <div className="quick-view"><Link to={`/products/${product.id}`}><Eye/> Xem nhanh</Link></div>
    </div>
    <div className="product-body">
      <div className="product-brand">{product.brand}</div>
      <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
      <div className="rating"><Star fill="currentColor"/> {product.rating} <span>•</span> Đã bán 120+</div>
      <div className="price-row"><strong>{money(product.price)}</strong>{product.oldPrice > product.price && <del>{money(product.oldPrice)}</del>}</div>
      <button className="add-btn" onClick={() => addToCart(product)}><ShoppingCart/> Thêm vào giỏ</button>
    </div>
  </article>;
}