import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, Search, ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import ProductCard from "../../components/ProductCard";
import { useApp } from "../../context/AppContext";
import { categories } from "../../data/products";

export default function Products() {
  const { products } = useApp();
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const category = params.get("category") || "Tất cả";
  const [sort, setSort] = useState("featured");
  const filtered = useMemo(() => {
    let list = products.filter(p => (category === "Tất cả" || p.category === category) && `${p.name} ${p.brand}`.toLowerCase().includes(search.toLowerCase()));
    if (sort === "low") list.sort((a,b) => a.price-b.price);
    if (sort === "high") list.sort((a,b) => b.price-a.price);
    if (sort === "rating") list.sort((a,b) => b.rating-a.rating);
    return list;
  }, [products, category, search, sort]);
  return <div className="page"><div className="container">
    <div className="page-title"><div><span className="eyebrow">SHOP</span><h1>Tất cả sản phẩm</h1><p>Khám phá bộ sưu tập công nghệ mới nhất.</p></div></div>
    <div className="catalog-toolbar"><div className="category-scroll">{categories.map(c => <button key={c} className={category === c ? "active" : ""} onClick={() => setParams(c === "Tất cả" ? {} : {category: c})}>{c}</button>)}</div><div className="catalog-actions"><div className="search-box"><Search/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Tìm sản phẩm..." /></div><div className="sort"><SlidersHorizontal/><select value={sort} onChange={e => setSort(e.target.value)}><option value="featured">Nổi bật</option><option value="low">Giá thấp → cao</option><option value="high">Giá cao → thấp</option><option value="rating">Đánh giá cao</option></select><ChevronDown/></div></div></div>
    <div className="result-line">{filtered.length} sản phẩm</div>
    <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p}/>)}</div>
    {!filtered.length && <div className="empty"><div>🔎</div><h3>Không tìm thấy sản phẩm</h3><p>Thử từ khóa hoặc danh mục khác.</p></div>}
  </div></div>;
}