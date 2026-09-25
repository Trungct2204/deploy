import { ShieldCheck, Truck, Star, Users } from "lucide-react";

export default function About() {
  return (
    <div>
      <section className="hero about-hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="hero-pill"><ShieldCheck size={13}/> VỀ NOVATECH</span>
            <h1>Công nghệ chính hãng.<br/><em>Tận tâm</em> từng đơn hàng.</h1>
            <p>NovaTech mang thiết bị công nghệ mới nhất đến gần hơn với người dùng Việt — minh bạch về giá, rõ ràng về nguồn gốc và luôn đồng hành sau khi bạn đã mua hàng.</p>
          </div>
          <div className="hero-product">
            <div className="hero-glow"></div>
            <div className="about-stat-block">
              <div><strong>50K+</strong><span>khách hàng tin dùng</span></div>
              <hr/>
              <div><strong>4.9/5</strong><span>đánh giá trung bình</span></div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container about-story">
          <div>
            <span className="eyebrow">CÂU CHUYỆN CỦA CHÚNG TÔI</span>
            <h2>Vì sao chúng tôi làm điều này</h2>
            <p className="detail-desc">NovaTech bắt đầu từ một câu hỏi đơn giản: vì sao mua đồ công nghệ chính hãng lại khó và tốn thời gian đến vậy? Chúng tôi xây dựng một nơi chọn mua rõ ràng, giá minh bạch và đội ngũ luôn sẵn sàng tư vấn — từ chiếc điện thoại đầu tiên đến chiếc laptop cho công việc.</p>
            <p className="detail-desc">Hôm nay, hơn 50.000 khách hàng trên toàn quốc đã tin chọn NovaTech, và đó là động lực để chúng tôi tiếp tục cải thiện mỗi ngày.</p>
          </div>
          <img className="about-photo" src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=90" alt="Thiết bị công nghệ NovaTech"/>
        </div>
      </section>

      <section className="features">
        <div className="container feature-grid">
          <div><ShieldCheck/><div><b>Chính hãng 100%</b><span>Cam kết nguồn gốc rõ ràng</span></div></div>
          <div><Truck/><div><b>Giao hàng toàn quốc</b><span>Nhanh chóng và an toàn</span></div></div>
          <div><Star/><div><b>4.9/5 đánh giá</b><span>Từ hơn 50.000 khách hàng</span></div></div>
          <div><Users/><div><b>Hỗ trợ tận tâm</b><span>Đồng hành sau khi mua hàng</span></div></div>
        </div>
      </section>
    </div>
  );
}