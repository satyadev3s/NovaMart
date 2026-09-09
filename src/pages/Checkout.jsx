import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";
import {
  CreditCard,
  QrCode,
  Banknote,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  AlertCircle,
  Truck,
} from "lucide-react";

const FREE_SHIPPING_LIMIT = 5000;
const SHIPPING_FEE = 499;

export default function Checkout() {
  const { cart, coupon, saveOrder } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    payment: "card",
  });

  const [error, setError] = useState("");

  const subtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  const discountAmount = coupon ? Math.round((subtotal * coupon.discountPercent) / 100) : 0;
  const shipping = subtotal >= FREE_SHIPPING_LIMIT ? 0 : SHIPPING_FEE;
  const grandTotal = Math.max(0, subtotal - discountAmount + shipping);

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  }

  function fillDemoData() {
    setForm({
      name: "Alex Morgan",
      email: "alex.morgan@example.com",
      phone: "+91 98765 43210",
      address: "Flat 402, Highline Residency, Indiranagar",
      city: "Bengaluru",
      state: "Karnataka",
      pincode: "560038",
      payment: "card",
    });
    setError("");
  }

  function handlePlaceOrder(e) {
    e.preventDefault();

    const requiredFields = ["name", "email", "phone", "address", "city", "state", "pincode"];
    const emptyField = requiredFields.find((field) => !form[field].trim());

    if (emptyField) {
      setError("Please complete all shipping address fields before placing your order.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    const orderId = "NM-" + Math.floor(100000 + Math.random() * 900000);
    const newOrder = {
      id: orderId,
      date: new Date().toLocaleDateString("en-IN", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
      items: [...cart],
      shippingAddress: { ...form },
      paymentMethod: form.payment,
      subtotal,
      discount: discountAmount,
      shipping,
      total: grandTotal,
      status: "Confirmed",
    };

    // Save order in context and local storage
    saveOrder(newOrder);

    // Navigate to success screen with state
    navigate("/checkout/success", { state: { order: newOrder } });
  }

  if (!cart.length) {
    return (
      <main className="container section" style={{ textAlign: "center", padding: "80px 20px" }}>
        <h2>Your shopping bag is empty</h2>
        <p style={{ color: "var(--slate-500)", margin: "16px 0 24px" }}>
          Please add items to your bag before proceeding to checkout.
        </p>
        <Link to="/products" className="btn btn-primary">
          Explore Collection
        </Link>
      </main>
    );
  }

  return (
    <main className="container section">
      <div className="section-header">
        <span className="eyebrow">
          <Lock size={12} /> Encrypted Checkout
        </span>
        <h1>Secure Checkout</h1>
      </div>

      <div className="checkout-grid">
        {/* Left Column: Shipping & Payment Form */}
        <div>
          {error && (
            <div className="form-error-banner" style={{ marginBottom: "20px" }}>
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handlePlaceOrder}>
            {/* Customer Contact & Delivery Info */}
            <div className="checkout-card">
              <h3>
                <span>1. Shipping & Contact Details</span>
                <button
                  type="button"
                  onClick={fillDemoData}
                  className="btn btn-ghost btn-sm"
                  style={{ color: "var(--brand-700)", fontWeight: 600 }}
                >
                  <Sparkles size={14} />
                  <span>Auto-fill Demo Details</span>
                </button>
              </h3>

              <div className="form-grid-2">
                <div className="form-group span-2">
                  <label htmlFor="name">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    required
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={updateField}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={form.email}
                    onChange={updateField}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={updateField}
                  />
                </div>

                <div className="form-group span-2">
                  <label htmlFor="address">Street Address</label>
                  <input
                    id="address"
                    name="address"
                    required
                    placeholder="Apartment, suite, unit, building, street"
                    value={form.address}
                    onChange={updateField}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <input
                    id="city"
                    name="city"
                    required
                    placeholder="Mumbai / Bengaluru"
                    value={form.city}
                    onChange={updateField}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <input
                    id="state"
                    name="state"
                    required
                    placeholder="Maharashtra"
                    value={form.state}
                    onChange={updateField}
                  />
                </div>

                <div className="form-group span-2">
                  <label htmlFor="pincode">PIN / Postal Code</label>
                  <input
                    id="pincode"
                    name="pincode"
                    required
                    placeholder="400001"
                    value={form.pincode}
                    onChange={updateField}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="checkout-card">
              <h3>2. Payment Method</h3>
              <p style={{ color: "var(--slate-500)", fontSize: "13px", marginBottom: "16px" }}>
                Select your preferred payment gateway. Transaction is 100% simulated and secure.
              </p>

              <div className="payment-options-grid">
                <div
                  className={`payment-option-card ${form.payment === "card" ? "selected" : ""}`}
                  onClick={() => setForm({ ...form, payment: "card" })}
                >
                  <CreditCard size={24} color={form.payment === "card" ? "var(--brand-700)" : "var(--slate-600)"} />
                  <h5>Credit / Debit Card</h5>
                  <p>Visa, MasterCard, RuPay</p>
                </div>

                <div
                  className={`payment-option-card ${form.payment === "upi" ? "selected" : ""}`}
                  onClick={() => setForm({ ...form, payment: "upi" })}
                >
                  <QrCode size={24} color={form.payment === "upi" ? "var(--brand-700)" : "var(--slate-600)"} />
                  <h5>Instant UPI</h5>
                  <p>GPay, PhonePe, Paytm</p>
                </div>

                <div
                  className={`payment-option-card ${form.payment === "cod" ? "selected" : ""}`}
                  onClick={() => setForm({ ...form, payment: "cod" })}
                >
                  <Banknote size={24} color={form.payment === "cod" ? "var(--brand-700)" : "var(--slate-600)"} />
                  <h5>Cash on Delivery</h5>
                  <p>Pay upon doorstep arrival</p>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-full" style={{ marginTop: "12px" }}>
              <Lock size={16} />
              <span>Complete Order · {formatPrice(grandTotal)}</span>
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary & Review */}
        <aside className="order-summary-card">
          <h3>Items in Order</h3>

          <div style={{ maxHeight: "280px", overflowY: "auto", paddingRight: "4px", marginBottom: "20px" }}>
            {cart.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  paddingBottom: "12px",
                  marginBottom: "12px",
                  borderBottom: "1px solid var(--border-color)",
                }}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "50px", height: "50px", borderRadius: "var(--radius-sm)", objectFit: "cover" }}
                />
                <div style={{ flex: 1 }}>
                  <h5 style={{ fontSize: "13px", fontWeight: 600, color: "var(--slate-900)" }}>{item.title}</h5>
                  <span style={{ fontSize: "12px", color: "var(--slate-500)" }}>Qty: {item.quantity}</span>
                </div>
                <span style={{ fontSize: "14px", fontWeight: 700, color: "var(--slate-950)" }}>
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="summary-row">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </div>

          {coupon && (
            <div className="summary-row discount-row">
              <span>Discount ({coupon.code})</span>
              <span>- {formatPrice(discountAmount)}</span>
            </div>
          )}

          <div className="summary-row">
            <span>Shipping</span>
            <strong>{shipping === 0 ? <span style={{ color: "var(--brand-700)" }}>Free</span> : formatPrice(shipping)}</strong>
          </div>

          <div className="summary-divider" />

          <div className="summary-total-row">
            <h4>Total Payable</h4>
            <span className="total-amount">{formatPrice(grandTotal)}</span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: "var(--slate-500)", marginTop: "16px" }}>
            <ShieldCheck size={16} color="var(--brand-600)" />
            <span>Buyer Protection Guarantee included</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
