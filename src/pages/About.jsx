import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Heart, Leaf, Users, ArrowRight } from "lucide-react";

export default function About() {
  return (
    <main>
      {/* Hero Section */}
      <section className="hero-split" style={{ paddingBottom: "48px" }}>
        <div className="container" style={{ textAlign: "center", maxWidth: "800px" }}>
          <span className="eyebrow" style={{ margin: "0 auto 16px" }}>
            <Sparkles size={12} /> The Nova Story
          </span>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(34px, 5vw, 56px)", color: "var(--slate-950)", marginBottom: "18px", lineHeight: 1.15 }}>
            Thoughtfully Made Essentials for Inspired Living.
          </h1>
          <p style={{ fontSize: "18px", color: "var(--slate-600)", lineHeight: 1.7, marginBottom: "32px" }}>
            NovaMart was founded on a simple conviction: the objects we surround ourselves with every day should bring utility, longevity, and genuine quiet joy.
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            <span>Explore the Catalog</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section style={{ backgroundColor: "var(--white)", borderTop: "1px solid var(--border-color)", borderBottom: "1px solid var(--border-color)", padding: "40px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "24px", textAlign: "center" }}>
            <div>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "var(--slate-900)", fontFamily: "var(--font-serif)" }}>
                150K+
              </div>
              <p style={{ color: "var(--slate-500)", fontSize: "14px", marginTop: "4px" }}>Discerning Shoppers</p>
            </div>
            <div>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "var(--slate-900)", fontFamily: "var(--font-serif)" }}>
                99.4%
              </div>
              <p style={{ color: "var(--slate-500)", fontSize: "14px", marginTop: "4px" }}>On-Time Courier Dispatch</p>
            </div>
            <div>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "var(--slate-900)", fontFamily: "var(--font-serif)" }}>
                100%
              </div>
              <p style={{ color: "var(--slate-500)", fontSize: "14px", marginTop: "4px" }}>Recyclable Packaging</p>
            </div>
            <div>
              <div style={{ fontSize: "36px", fontWeight: 800, color: "var(--slate-900)", fontFamily: "var(--font-serif)" }}>
                4.9 ★
              </div>
              <p style={{ color: "var(--slate-500)", fontSize: "14px", marginTop: "4px" }}>Average Product Satisfaction</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars Grid */}
      <section className="container section">
        <div className="section-header center">
          <span className="eyebrow">Our Philosophy</span>
          <h2>Crafted With Integrity</h2>
          <p className="subtitle">
            Every material, finish, and vendor is vetted against uncompromising criteria.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "28px" }}>
          <div className="profile-card" style={{ padding: "32px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--brand-50)", color: "var(--brand-700)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
              <Leaf size={24} />
            </div>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Sustainable Materials</h3>
            <p style={{ color: "var(--slate-600)", lineHeight: 1.6 }}>
              We collaborate with manufacturers who value responsible sourcing, renewable botanicals, and long-lasting fabrications over transient fast-fashion.
            </p>
          </div>

          <div className="profile-card" style={{ padding: "32px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--amber-50)", color: "var(--amber-600)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Enduring Quality</h3>
            <p style={{ color: "var(--slate-600)", lineHeight: 1.6 }}>
              Built to withstand the test of real everyday routines. We believe that true luxury lies in objects that perform gracefully year after year.
            </p>
          </div>

          <div className="profile-card" style={{ padding: "32px" }}>
            <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: "var(--indigo-50)", color: "var(--indigo-600)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "18px" }}>
              <Users size={24} />
            </div>
            <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>Community Centric</h3>
            <p style={{ color: "var(--slate-600)", lineHeight: 1.6 }}>
              Direct client feedback fuels our curatorial evolution. We listen, adapt, and refine our catalog to match the rhythms of modern life.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
