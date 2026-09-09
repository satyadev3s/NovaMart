import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import QuantitySelector from "../components/QuantitySelector";
import EmptyState from "../components/EmptyState";
import { formatPrice } from "../utils/currency";
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Truck,
  Sparkles,
  Tag,
  X,
} from "lucide-react";

const FREE_SHIPPING_LIMIT = 5000;
const SHIPPING_FEE = 499;

export default function Cart() {
  const { cart, updateQuantity, removeFromCart, coupon, applyCoupon, removeCoupon, addToast } = useCart();
  const [couponInput, setCouponInput] = useState("");
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("novamart-user") === "true";

  const handleProceedToCheckout = () => {
    if (!isLoggedIn) {
      addToast("Please sign in or register to proceed to checkout", "info");
      navigate("/login", { state: { from: { pathname: "/checkout" } } });
      return;
    }
    navigate("/checkout");
  };

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = coupon ? Math.round((subtotal * coupon.discountPercent) / 100) : 0;
  const eligibleForFreeShipping = subtotal >= FREE_SHIPPING_LIMIT;
  const shipping = eligibleForFreeShipping ? 0 : SHIPPING_FEE;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  const shippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_LIMIT) * 100));
  const amountNeededForFreeShipping = FREE_SHIPPING_LIMIT - subtotal;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput("");
    }
  };

  if (!cart.length) {
    return (
      <main className="container section">
        <EmptyState
          icon={ShoppingBag}
          title="Your shopping bag is empty"
          text="Looks like you haven't added any pieces to your bag yet. Explore our handcrafted essentials."
          link="/products"
          buttonText="Explore Collection"
        />
      </main>
    );
  }

  return (
    <main className="container section">
      <div className="section-header">
        <span className="eyebrow">
          <ShoppingBag size={12} /> Your Selection
        </span>
        <h1>Shopping Bag ({cart.reduce((s, i) => s + i.quantity, 0)} items)</h1>
      </div>

      <div className="cart-page-grid">
        {/* Left Column: Items List & Free Shipping Meter */}
        <div>
          {/* Free Shipping Progress Meter */}
          <div className="shipping-meter-card">
            <div className="shipping-meter-text">
              <Truck size={17} />
              {eligibleForFreeShipping ? (
                <span>🎉 You've qualified for <strong>FREE Express Shipping!</strong></span>
              ) : (
                <span>
                  Add <strong>{formatPrice(amountNeededForFreeShipping)}</strong> more to get <strong>FREE Express Delivery</strong>
                </span>
              )}
            </div>
            <div className="shipping-progress-track">
              <div
                className="shipping-progress-fill"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items Wrapper */}
          <div className="cart-items-wrapper">
            {cart.map((item) => (
              <div key={item.id} className="cart-item-row">
                <div className="cart-item-img">
                  <Link to={`/products/${item.id}`}>
                    <img src={item.image} alt={item.title} />
                  </Link>
                </div>

                <div className="cart-item-info">
                  <Link to={`/products/${item.id}`}>
                    <h4>{item.title}</h4>
                  </Link>
                  <p className="category">{item.category}</p>

                  <div className="cart-item-actions">
                    <QuantitySelector
                      value={item.quantity}
                      onChange={(q) => updateQuantity(item.id, q)}
                      max={item.stock}
                    />

                    <button
                      className="btn-remove-item"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      <Trash2 size={15} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>

                <div className="cart-item-price">
                  <span>{formatPrice(item.price * item.quantity)}</span>
                  {item.quantity > 1 && (
                    <div style={{ fontSize: "12px", color: "var(--slate-400)", fontWeight: 400 }}>
                      {formatPrice(item.price)} each
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Order Summary Card */}
        <aside className="order-summary-card">
          <h3>Order Summary</h3>

          {/* Promo Code Input or Active Chip */}
          {coupon ? (
            <div className="applied-coupon-pill">
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <Tag size={15} />
                <span>{coupon.code} ({coupon.discountPercent}% OFF)</span>
              </div>
              <button onClick={removeCoupon} title="Remove coupon" aria-label="Remove coupon">
                <X size={15} />
              </button>
            </div>
          ) : (
            <form onSubmit={handleApplyCoupon} className="coupon-input-group">
              <input
                type="text"
                placeholder="PROMO CODE (e.g. WELCOME10)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
              />
              <button type="submit" className="btn btn-outline btn-sm">
                Apply
              </button>
            </form>
          )}

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          {coupon && (
            <div className="summary-row discount-row">
              <span>Promo Discount ({coupon.code})</span>
              <span>- {formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Estimated Shipping</span>
            <strong>{shipping === 0 ? <span style={{ color: "var(--brand-700)" }}>Free</span> : formatPrice(shipping)}</strong>
          </div>

          <div className="summary-divider" />

          <div className="summary-total-row">
            <h4>Estimated Total</h4>
            <span className="total-amount">{formatPrice(grandTotal)}</span>
          </div>

          <button
            type="button"
            onClick={handleProceedToCheckout}
            className="btn btn-primary btn-full btn-lg"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight size={16} />
          </button>

          <div style={{ marginTop: "16px", textAlign: "center" }}>
            <Link to="/products" className="btn-ghost" style={{ fontSize: "13px", fontWeight: 600 }}>
              ← Continue Shopping
            </Link>
          </div>

          <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid var(--border-color)", display: "flex", flexDirection: "column", gap: "10px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--slate-500)" }}>
              <ShieldCheck size={16} color="var(--brand-600)" />
              <span>256-bit Bank Grade Encrypted Security</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--slate-500)" }}>
              <Truck size={16} color="var(--brand-600)" />
              <span>Tracked Doorstep Courier Dispatch</span>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
