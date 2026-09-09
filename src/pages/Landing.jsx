import { Link } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import ProductGrid from "../components/ProductGrid";
import {
  ArrowRight,
  Sparkles,
  Star,
  Truck,
  ShieldCheck,
  RefreshCw,
  Clock,
  CheckCircle2,
} from "lucide-react";

const categories = [
  { name: "Electronics", filter: "Electronics", image: "photo-1516321318423-f06f85e504b3", count: "8 items" },
  { name: "Fashion", filter: "Clothing", image: "photo-1483985988355-763728e1935b", count: "12 items" },
  { name: "Footwear", filter: "Shoes", image: "photo-1542291026-7eec264c27ff", count: "6 items" },
  { name: "Accessories", filter: "Accessories", image: "photo-1523779917675-b6ed3a42a561", count: "9 items" },
  { name: "Home Living", filter: "Home", image: "photo-1618221195710-dd6b41faaea6", count: "7 items" },
  { name: "Beauty", filter: "Beauty", image: "photo-1596462502278-27bfdc403348", count: "10 items" },
];

const categoryImgUrl = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=700&q=80`;

export default function Landing() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const featuredProducts = products.filter((p) => p.featured).slice(0, 4);
  const bestsellers = products.filter((p) => p.bestseller).slice(0, 4);

  function handleSubscribe(e) {
    e.preventDefault();
    if (/^\S+@\S+\.\S+$/.test(email)) {
      setSubscribed(true);
      setEmail("");
    }
  }

  return (
    <main>
      {/* Split Hero Section */}
      <section className="hero-split">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-text">
              <span className="eyebrow">
                <Sparkles size={12} /> New Season Collection 2026
              </span>
              <h1>
                Everyday Objects,<br />
                <em>Exceptionally Crafted.</em>
              </h1>
              <p className="lead-text">
                Discover curated essentials designed to elevate your everyday routines. Minimalist silhouettes, sustainable materials, and enduring beauty.
              </p>

              <div className="hero-actions">
                <Link to="/products" className="btn btn-primary btn-lg">
                  <span>Explore Collection</span>
                  <ArrowRight size={18} />
                </Link>
                <a href="#categories" className="btn btn-outline btn-lg">
                  Browse Categories
                </a>
              </div>

              {/* Social Proof Strip */}
              <div className="hero-proof-strip">
                <div className="proof-item">
                  <div className="proof-icon">
                    <Star size={18} fill="currentColor" />
                  </div>
                  <div>
                    <h4>4.9 / 5.0 Rating</h4>
                    <p>Over 14,000 verified buyers</p>
                  </div>
                </div>

                <div className="proof-item">
                  <div className="proof-icon">
                    <Truck size={18} />
                  </div>
                  <div>
                    <h4>Express Delivery</h4>
                    <p>Dispatch within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-visual">
              <div className="hero-img-container">
                <img
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85"
                  alt="NovaMart Lifestyle Collection"
                />
              </div>

              {/* Floating Social Proof Card */}
              <div className="hero-floating-card">
                <div className="card-avatar-group">
                  <img
                    className="avatar-circle"
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                    alt="Shopper"
                  />
                  <img
                    className="avatar-circle"
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
                    alt="Shopper"
                  />
                  <img
                    className="avatar-circle"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
                    alt="Shopper"
                  />
                </div>
                <div className="card-info">
                  <h5>Staff Pick of the Week</h5>
                  <p>
                    <Star size={12} fill="#f59e0b" color="#f59e0b" />
                    <span>Top customer favorite</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container section" id="categories">
        <div className="section-header flex-between">
          <div>
            <span className="eyebrow">Curated Departments</span>
            <h2>Shop by Category</h2>
            <p className="subtitle">
              Handpicked across tech, apparel, footwear, accessories, and interior decor.
            </p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">
            <span>View All Departments</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <div className="category-cards-grid">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/products?category=${cat.filter}`}
              className="cat-card"
            >
              <img src={categoryImgUrl(cat.image)} alt={cat.name} loading="lazy" />
              <div className="cat-card-overlay">
                <h3>{cat.name}</h3>
                <span className="explore-tag">
                  <span>Explore</span>
                  <ArrowRight size={13} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container section" style={{ paddingTop: 0 }}>
        <div className="section-header flex-between">
          <div>
            <span className="eyebrow">Handpicked For You</span>
            <h2>Featured Picks</h2>
            <p className="subtitle">
              Distinctive design and premium build quality that stands out.
            </p>
          </div>
          <Link to="/products" className="btn btn-outline btn-sm">
            <span>Shop Full Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={featuredProducts} />
      </section>

      {/* Luxury Promo Banner */}
      <section className="container">
        <div className="promo-banner-luxury">
          <span className="eyebrow" style={{ background: "rgba(255,255,255,0.15)", color: "var(--white)" }}>
            Limited Time Offer
          </span>
          <h2>Experience Everyday Luxury with 10% Off.</h2>
          <p>
            Use exclusive promotion code <strong style={{ color: "var(--brand-200)" }}>WELCOME10</strong> at checkout on all signature pieces.
          </p>
          <div>
            <Link to="/products" className="btn btn-white btn-lg">
              <span>Claim Your Discount</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <section className="container section">
        <div className="section-header flex-between">
          <div>
            <span className="eyebrow">Community Favorites</span>
            <h2>Trending Bestsellers</h2>
            <p className="subtitle">
              The highest rated items loved by our discerning clientele.
            </p>
          </div>
          <Link to="/products?sort=rating" className="btn btn-outline btn-sm">
            <span>View All Bestsellers</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        <ProductGrid products={bestsellers} />
      </section>

      {/* Value Pillars Strip */}
      <section className="features-strip">
        <div className="container">
          <div className="features-grid">
            <div className="feature-col">
              <div className="icon-wrap">
                <Truck size={22} />
              </div>
              <div>
                <h4>Express Free Shipping</h4>
                <p>Complimentary fast shipping on all orders exceeding ₹5,000.</p>
              </div>
            </div>

            <div className="feature-col">
              <div className="icon-wrap">
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4>Authentic & Guaranteed</h4>
                <p>Every piece is vetted for authentic craftsmanship and durability.</p>
              </div>
            </div>

            <div className="feature-col">
              <div className="icon-wrap">
                <RefreshCw size={22} />
              </div>
              <div>
                <h4>30-Day Effortless Returns</h4>
                <p>Try it in your space. Return or exchange without hassle.</p>
              </div>
            </div>

            <div className="feature-col">
              <div className="icon-wrap">
                <Clock size={22} />
              </div>
              <div>
                <h4>24/7 Dedicated Support</h4>
                <p>Our concierge team is here to assist with any inquiry anytime.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container section">
        <div className="newsletter-card-modern">
          <span className="eyebrow" style={{ background: "rgba(255,255,255,0.12)", color: "var(--brand-200)", margin: "0 auto 16px" }}>
            The Nova Insider
          </span>
          <h2>Join the Circle</h2>
          <p>
            Receive private exhibition invitations, seasonal drops, and insider styling notes directly in your inbox.
          </p>

          {subscribed ? (
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(16, 185, 129, 0.2)", padding: "12px 24px", borderRadius: "var(--radius-full)" }}>
              <CheckCircle2 size={20} color="var(--brand-300)" />
              <span style={{ fontWeight: 600, color: "var(--white)" }}>You're on the list! Welcome to NovaMart.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form-inline">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                aria-label="Email address for newsletter"
              />
              <button type="submit" className="btn btn-accent">
                <span>Subscribe</span>
                <ArrowRight size={15} />
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
}
