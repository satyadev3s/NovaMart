import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";
import ProductGrid from "../components/ProductGrid";
import { formatPrice } from "../utils/currency";
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Truck,
  ShieldCheck,
  RefreshCw,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => item.id === Number(id));
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState("features");

  if (!product) {
    return (
      <main className="container section" style={{ textAlign: "center", padding: "100px 20px" }}>
        <h2>Product not found</h2>
        <p style={{ color: "var(--slate-500)", margin: "16px 0 24px" }}>
          The item you are looking for might have been retired from our catalog.
        </p>
        <Link to="/products" className="btn btn-primary">
          Back to Catalog
        </Link>
      </main>
    );
  }

  const isSaved = wishlist.some((item) => item.id === product.id);
  const galleryImages = product.images && product.images.length > 0 ? product.images : [product.image];
  const relatedProducts = products
    .filter((item) => item.category === product.category && item.id !== product.id)
    .slice(0, 4);

  const handleBuyNow = () => {
    addToCart(product, quantity, false);
    navigate("/checkout");
  };

  const isLowStock = product.stock <= 8;

  return (
    <main className="container section" style={{ paddingTop: "24px" }}>
      {/* Breadcrumb Navigation */}
      <nav
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          fontSize: "13px",
          color: "var(--slate-500)",
          marginBottom: "28px",
        }}
        aria-label="Breadcrumb"
      >
        <Link to="/" style={{ color: "var(--slate-600)" }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/products" style={{ color: "var(--slate-600)" }}>Shop</Link>
        <ChevronRight size={14} />
        <Link to={`/products?category=${product.category}`} style={{ color: "var(--slate-600)" }}>
          {product.category}
        </Link>
        <ChevronRight size={14} />
        <span style={{ color: "var(--slate-900)", fontWeight: 600 }}>{product.title}</span>
      </nav>

      {/* Main Details Grid */}
      <div className="product-details-grid">
        {/* Left: Interactive Image Gallery */}
        <div className="gallery-wrapper">
          <div className="gallery-main-img">
            <img
              src={galleryImages[selectedImageIndex] || product.image}
              alt={product.title}
            />
          </div>

          {galleryImages.length > 1 && (
            <div className="gallery-thumbnails">
              {galleryImages.map((imgUrl, index) => (
                <button
                  key={index}
                  className={`gallery-thumb-btn ${selectedImageIndex === index ? "active" : ""}`}
                  onClick={() => setSelectedImageIndex(index)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img src={imgUrl} alt={`${product.title} thumbnail ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Information */}
        <div className="product-detail-info">
          <span className="eyebrow">{product.category}</span>
          <h1 className="product-detail-title">{product.title}</h1>

          {/* Rating and Stock Pill */}
          <div className="rating-and-stock">
            <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--amber-600)", fontWeight: 700 }}>
              <Star size={16} fill="currentColor" />
              <span>{product.rating?.toFixed(1) || "4.8"}</span>
              <span style={{ color: "var(--slate-400)", fontWeight: 500, fontSize: "13px" }}>
                ({product.reviews || 84} verified reviews)
              </span>
            </div>

            <span className={`stock-badge ${isLowStock ? "low-stock" : "in-stock"}`}>
              {isLowStock ? `Only ${product.stock} items left in stock` : "In Stock — Ready to ship"}
            </span>
          </div>

          {/* Price Box */}
          <div className="detail-price-box">
            <span className="detail-price-main">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="detail-price-strike">{formatPrice(product.originalPrice)}</span>
            )}
            {product.discount > 0 && (
              <span className="detail-save-badge">Save {product.discount}%</span>
            )}
          </div>

          {/* Description */}
          <p className="product-description-text">{product.description}</p>

          {/* Stepper and Actions */}
          <div className="action-row">
            <QuantitySelector
              value={quantity}
              onChange={setQuantity}
              max={product.stock}
            />

            <button
              className="btn btn-primary btn-lg"
              onClick={() => addToCart(product, quantity)}
              style={{ flex: "1 1 180px" }}
            >
              <ShoppingBag size={18} />
              <span>Add to Bag</span>
            </button>

            <button
              className="btn btn-accent btn-lg"
              onClick={handleBuyNow}
              style={{ flex: "1 1 140px" }}
            >
              <Zap size={18} />
              <span>Buy Now</span>
            </button>

            <button
              className={`btn btn-outline btn-lg ${isSaved ? "active" : ""}`}
              onClick={() => toggleWishlist(product)}
              aria-label={isSaved ? "Saved to wishlist" : "Save to wishlist"}
              title="Save to wishlist"
            >
              <Heart size={18} fill={isSaved ? "var(--rose-500)" : "none"} color={isSaved ? "var(--rose-500)" : "currentColor"} />
            </button>
          </div>

          {/* Trust Pillars */}
          <div className="trust-pillars">
            <div className="pillar-item">
              <strong><Truck size={16} color="var(--brand-600)" /> Free Courier</strong>
              <span>Fast express dispatch on orders over ₹5,000.</span>
            </div>
            <div className="pillar-item">
              <strong><RefreshCw size={16} color="var(--brand-600)" /> 30-Day Returns</strong>
              <span>Effortless doorstep returns & replacements.</span>
            </div>
            <div className="pillar-item">
              <strong><ShieldCheck size={16} color="var(--brand-600)" /> 100% Authentic</strong>
              <span>Sourced straight from certified artisans.</span>
            </div>
          </div>

          {/* Accordion Tabs */}
          <div className="accordion-wrapper">
            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === "features" ? "" : "features")}
              >
                <span>Product Features & Specs</span>
                {openAccordion === "features" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === "features" && (
                <div className="accordion-content">
                  <ul style={{ paddingLeft: "18px", display: "flex", flexDirection: "column", gap: "6px" }}>
                    <li>Engineered with sustainable, premium-grade materials.</li>
                    <li>Designed for long-lasting performance and ergonomic daily use.</li>
                    <li>Tested and inspected according to high international standards.</li>
                    <li>Includes manufacturer warranty card and certificate of authenticity.</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="accordion-item">
              <button
                className="accordion-header"
                onClick={() => setOpenAccordion(openAccordion === "shipping" ? "" : "shipping")}
              >
                <span>Shipping & Delivery Timelines</span>
                {openAccordion === "shipping" ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>
              {openAccordion === "shipping" && (
                <div className="accordion-content">
                  Orders placed before 2:00 PM are packaged and dispatched same-day. Standard express delivery typically takes 2-4 business days. Real-time courier tracking is provided via email upon shipment.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="section" style={{ marginTop: "32px" }}>
          <div className="section-header flex-between">
            <div>
              <span className="eyebrow">Complementary Style</span>
              <h2>You May Also Like</h2>
              <p className="subtitle">
                Explore pieces thoughtfully matched to your current selection.
              </p>
            </div>
            <Link to={`/products?category=${product.category}`} className="btn btn-outline btn-sm">
              <span>View More in {product.category}</span>
              <ChevronRight size={14} />
            </Link>
          </div>
          <ProductGrid products={relatedProducts} />
        </section>
      )}
    </main>
  );
}
