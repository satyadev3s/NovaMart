import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2, Sparkles } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    if (form.name && form.email && form.message) {
      setSent(true);
      setForm({ name: "", email: "", subject: "", message: "" });
    }
  };

  return (
    <main className="container section">
      <div className="section-header">
        <span className="eyebrow">
          <Sparkles size={12} /> Direct Concierge
        </span>
        <h1>Get in Touch</h1>
        <p className="subtitle">
          Have an inquiry about an order, styling recommendation, or partnership? Our team is at your service.
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", alignItems: "flex-start" }}>
        {/* Left Column: Direct Info Cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div className="profile-card">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--brand-50)", color: "var(--brand-700)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Mail size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: "16px", color: "var(--slate-900)" }}>Electronic Mail</h4>
                <p style={{ color: "var(--slate-500)", fontSize: "13px" }}>concierge@novamart.example</p>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "var(--slate-600)" }}>
              Expect a personalized response from our team within 4 business hours.
            </p>
          </div>

          <div className="profile-card">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--amber-50)", color: "var(--amber-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Phone size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: "16px", color: "var(--slate-900)" }}>Telephone Care</h4>
                <p style={{ color: "var(--slate-500)", fontSize: "13px" }}>+91 800 555 0199</p>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "var(--slate-600)" }}>
              Monday through Saturday, 9:00 AM – 7:00 PM IST.
            </p>
          </div>

          <div className="profile-card">
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "12px" }}>
              <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: "var(--indigo-50)", color: "var(--indigo-600)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <MapPin size={20} />
              </div>
              <div>
                <h4 style={{ fontSize: "16px", color: "var(--slate-900)" }}>Headquarters Studio</h4>
                <p style={{ color: "var(--slate-500)", fontSize: "13px" }}>Indiranagar 100ft Road, Bengaluru, 560038</p>
              </div>
            </div>
            <p style={{ fontSize: "13px", color: "var(--slate-600)" }}>
              Showroom visits available by private appointment.
            </p>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="checkout-card" style={{ padding: "36px" }}>
          {sent ? (
            <div style={{ textAlign: "center", padding: "40px 16px" }}>
              <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "var(--brand-50)", color: "var(--brand-600)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                <CheckCircle2 size={32} />
              </div>
              <h3 style={{ fontSize: "22px", color: "var(--slate-900)", marginBottom: "8px" }}>Message Dispatched</h3>
              <p style={{ color: "var(--slate-600)", fontSize: "15px", marginBottom: "24px" }}>
                Thank you for reaching out. A dedicated member of our concierge team will contact you shortly.
              </p>
              <button className="btn btn-outline btn-sm" onClick={() => setSent(false)}>
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <h3 style={{ margin: 0 }}>Send Us a Message</h3>

              <div className="form-group">
                <label>Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Jane Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="jane@example.com"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  placeholder="Order inquiry, sizing, or styling advice"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  rows="4"
                  required
                  placeholder="How may we assist you today?"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
              </div>

              <button type="submit" className="btn btn-primary btn-lg btn-full" style={{ marginTop: "8px" }}>
                <Send size={16} />
                <span>Transmit Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
