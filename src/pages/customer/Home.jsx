import { Link } from "react-router-dom";
import { ArrowRight, ShieldCheck, Truck, Headphones, RotateCcw, Zap } from "lucide-react";
import ProductCard from "../../components/ProductCard";
import { useApp } from "../../context/AppContext";

export default function Home() {
  const { products } = useApp();
  const promoProduct = products.find(p => p.id === 3);
  return <div>
    <section className="hero"><div className="container hero-grid"><div className="hero-copy"><span className="hero-pill"><Zap/> TECH SALE 2026</span><h1>Công nghệ mới.<br/><em>Phong cách</em> của bạn.</h1><p>Khám phá những thiết bị công nghệ mới nhất với mức giá tốt, bảo hành chính hãng và giao hàng toàn quốc.</p><div className="hero-actions"><Link to="/products" className="primary-btn">Khám phá ngay <ArrowRight/></Link><Link to="/products" className="secondary-btn">Xem ưu đãi</Link></div><div className="hero-trust"><span>★ 4.9/5</span><span>•</span><span>50K+ khách hàng</span></div></div><div className="hero-product"><div className="hero-glow"></div><div className="hero-device"><img src="https://cdsassets.apple.com/live/7WUAS350/images/tech-specs/iphone-17-pro-17-pro-max-hero.png" alt="Điện thoại công nghệ" /></div><div className="floating-card top"><b>−20%</b><small>Ưu đãi hôm nay</small></div><div className="floating-card bottom"><span>★</span><div><b>4.9</b><small>12.8K đánh giá</small></div></div></div></div></section>
    <section className="features"><div className="container feature-grid"><div><Truck/><div><b>Miễn phí giao hàng</b><span>Đơn từ 500.000₫</span></div></div><div><ShieldCheck/><div><b>Chính hãng 100%</b><span>Cam kết nguồn gốc</span></div></div><div><RotateCcw/><div><b>Đổi trả 30 ngày</b><span>Đổi mới dễ dàng</span></div></div><div><Headphones/><div><b>Hỗ trợ 24/7</b><span>Luôn sẵn sàng hỗ trợ</span></div></div></div></section>
    <section className="section"><div className="container"><div className="section-head"><div><span className="eyebrow">FEATURED</span><h2>Sản phẩm nổi bật</h2><p>Những thiết bị đang được yêu thích nhất.</p></div><Link to="/products" className="view-all">Xem tất cả <ArrowRight/></Link></div><div className="product-grid">{products.slice(0, 8).map(p => <ProductCard key={p.id} product={p}/>)}</div></div></section>
    <section className="promo"><div className="container promo-inner"><div><span className="hero-pill">LIMITED OFFER</span><h2>Tech Week — Giảm đến 30%</h2><p>Ưu đãi đặc biệt cho hàng loạt sản phẩm công nghệ. Số lượng có hạn.</p><Link to="/products" className="primary-btn">Mua ngay <ArrowRight/></Link></div><div className="promo-art"><img src={promoProduct?.image} alt="MacBook Pro M4" /></div></div></section>
  </div>;
}