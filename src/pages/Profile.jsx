import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";
import {
  User,
  Package,
  LogOut,
  Edit3,
  CheckCircle2,
  Clock,
  Sparkles,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

const defaultProfile = {
  name: "Alex Morgan",
  email: "alex.morgan@example.com",
  phone: "+91 98765 43210",
};

export default function Profile() {
  const navigate = useNavigate();
  const { orders } = useCart();
  const [profile, setProfile] = useState(
    () => JSON.parse(localStorage.getItem("novamart-profile") || "null") || defaultProfile
  );
  const [editing, setEditing] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState(profile);

  function handleSaveProfile(e) {
    e.preventDefault();
    localStorage.setItem("novamart-profile", JSON.stringify(form));
    setProfile(form);
    setEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleLogout() {
    localStorage.removeItem("novamart-user");
    navigate("/", { replace: true });
  }

  const initials = profile.name
    ? profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "AM";

  return (
    <main>
      {/* Profile Header Hero */}
      <section className="profile-hero">
        <div className="container profile-hero-content">
          <div className="user-profile-summary">
            <div className="profile-avatar-large">{initials}</div>
            <div>
              <span className="eyebrow" style={{ background: "rgba(255,255,255,0.15)", color: "var(--brand-200)" }}>
                <Sparkles size={11} /> Premier Member
              </span>
              <h1>Welcome, {profile.name}</h1>
              <p>{profile.email} · Member since 2026</p>
            </div>
          </div>

          <button className="btn btn-outline" onClick={handleLogout} style={{ borderColor: "rgba(255,255,255,0.3)", color: "var(--white)" }}>
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="container section-tight" style={{ paddingBottom: "64px" }}>
        <div className="profile-grid-layout">
          {/* Left: Profile Info Card */}
          <div>
            <div className="profile-card">
              <h3>
                <span>Personal Information</span>
                {!editing && (
                  <button
                    className="btn btn-ghost btn-sm"
                    onClick={() => setEditing(true)}
                  >
                    <Edit3 size={15} />
                    <span>Edit</span>
                  </button>
                )}
              </h3>

              {saved && (
                <div style={{ display: "flex", alignItems: "center", gap: "6px", color: "var(--brand-700)", fontSize: "13px", fontWeight: 600, marginBottom: "16px" }}>
                  <CheckCircle2 size={16} />
                  <span>Profile details updated successfully!</span>
                </div>
              )}

              {editing ? (
                <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      required
                    />
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                    <button type="submit" className="btn btn-primary btn-full">
                      Save Changes
                    </button>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => {
                        setForm(profile);
                        setEditing(false);
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "14px", fontSize: "14px" }}>
                  <div>
                    <span style={{ color: "var(--slate-400)", fontSize: "12px", display: "block" }}>FULL NAME</span>
                    <strong style={{ color: "var(--slate-900)" }}>{profile.name}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--slate-400)", fontSize: "12px", display: "block" }}>EMAIL ADDRESS</span>
                    <strong style={{ color: "var(--slate-900)" }}>{profile.email}</strong>
                  </div>
                  <div>
                    <span style={{ color: "var(--slate-400)", fontSize: "12px", display: "block" }}>CONTACT PHONE</span>
                    <strong style={{ color: "var(--slate-900)" }}>{profile.phone}</strong>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right: Order History */}
          <div className="profile-card">
            <h3>
              <span>Order History & Deliveries</span>
              <Package size={20} color="var(--slate-500)" />
            </h3>

            {orders && orders.length > 0 ? (
              <div>
                {orders.map((order) => (
                  <div key={order.id} className="order-history-card">
                    <div className="order-header-line">
                      <div>
                        <strong style={{ fontSize: "15px", color: "var(--slate-950)" }}>
                          Order #{order.id}
                        </strong>
                        <div style={{ fontSize: "12px", color: "var(--slate-500)", marginTop: "2px" }}>
                          Placed on {order.date}
                        </div>
                      </div>

                      <span className="order-badge-status">
                        {order.status || "Confirmed"}
                      </span>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
                      <div style={{ display: "flex", gap: "8px", overflowX: "auto" }}>
                        {order.items?.map((item) => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.title}
                            title={`${item.title} (Qty: ${item.quantity})`}
                            style={{ width: "42px", height: "42px", borderRadius: "6px", objectFit: "cover" }}
                          />
                        ))}
                      </div>

                      <div style={{ textAlign: "right" }}>
                        <span style={{ fontSize: "12px", color: "var(--slate-500)", display: "block" }}>Total Paid</span>
                        <strong style={{ fontSize: "16px", color: "var(--slate-900)" }}>
                          {formatPrice(order.total)}
                        </strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: "center", padding: "48px 16px" }}>
                <Package size={40} color="var(--slate-300)" style={{ margin: "0 auto 12px" }} />
                <h4 style={{ fontSize: "17px", color: "var(--slate-800)", marginBottom: "6px" }}>No orders placed yet</h4>
                <p style={{ color: "var(--slate-500)", fontSize: "14px", marginBottom: "20px" }}>
                  Your purchases will appear here with live tracking once you place an order.
                </p>
                <Link to="/products" className="btn btn-primary btn-sm">
                  <span>Start Shopping</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
