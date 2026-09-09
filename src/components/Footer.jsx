import { Link } from "react-router-dom";
import { Sparkles, ShieldCheck, Truck, RefreshCw } from "lucide-react";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Brand Info */}
          <div className="footer-brand">
            <Link to="/" className="nav-brand" style={{ color: "var(--white)", marginBottom: "16px" }}>
              <div className="brand-logo-icon">
                <Sparkles size={18} />
              </div>
              <span>NOVA</span>
              <span className="accent">MART</span>
            </Link>
            <p>
              Thoughtfully curated lifestyle essentials designed for modern everyday living. Premium quality, responsible craft, and seamless delivery.
            </p>
            <div className="footer-social-links">
              <a href="#instagram" className="footer-social-btn" aria-label="Instagram">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                </svg>
              </a>
              <a href="#facebook" className="footer-social-btn" aria-label="Facebook">
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
              <a href="#twitter" className="footer-social-btn" aria-label="Twitter">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Categories */}
          <div className="footer-col">
            <h4>Shop Categories</h4>
            <ul className="footer-links-list">
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products?category=Electronics">Electronics & Audio</Link></li>
              <li><Link to="/products?category=Clothing">Apparel & Fashion</Link></li>
              <li><Link to="/products?category=Shoes">Footwear</Link></li>
              <li><Link to="/products?category=Accessories">Accessories</Link></li>
              <li><Link to="/products?category=Home">Home & Living</Link></li>
              <li><Link to="/products?category=Beauty">Beauty & Wellness</Link></li>
            </ul>
          </div>

          {/* Customer Support */}
          <div className="footer-col">
            <h4>Customer Care</h4>
            <ul className="footer-links-list">
              <li><Link to="/contact">Help & Contact Center</Link></li>
              <li><Link to="/about">About NovaMart</Link></li>
              <li><Link to="/cart">Track Your Bag</Link></li>
              <li><Link to="/profile">My Account</Link></li>
              <li><a href="#shipping">Shipping Information</a></li>
              <li><a href="#returns">Returns & Exchanges</a></li>
            </ul>
          </div>

          {/* Trust Guarantees */}
          <div className="footer-col">
            <h4>Our Promise</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "4px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <Truck size={20} style={{ color: "var(--brand-500)", flexShrink: 0 }} />
                <span style={{ fontSize: "13px" }}>Free express shipping on orders over ₹5,000</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <RefreshCw size={20} style={{ color: "var(--brand-500)", flexShrink: 0 }} />
                <span style={{ fontSize: "13px" }}>Hassle-free 30-day return policy</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShieldCheck size={20} style={{ color: "var(--brand-500)", flexShrink: 0 }} />
                <span style={{ fontSize: "13px" }}>100% Authentic & secure checkout</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p>© {new Date().getFullYear()} NOVAMART Inc. All rights reserved. Crafted for elegance.</p>
          <div className="payment-badges-row">
            <span>Secure Payments:</span>
            <span className="pay-badge-pill">UPI</span>
            <span className="pay-badge-pill">Visa</span>
            <span className="pay-badge-pill">Mastercard</span>
            <span className="pay-badge-pill">NetBanking</span>
            <span className="pay-badge-pill">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
