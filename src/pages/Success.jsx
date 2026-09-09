import { Link, useLocation } from "react-router-dom";
import { Check, ArrowRight, Package, User, Calendar, ShieldCheck } from "lucide-react";
import { formatPrice } from "../utils/currency";

export default function Success() {
  const location = useLocation();
  const order = location.state?.order;

  // Calculate estimated delivery date: 4 days from now
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 4);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-IN", {
    weekday: "long",
    month: "short",
    day: "numeric",
  });

  const orderId = order?.id || "NM-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <main className="container section">
      <div className="success-card">
        <div className="success-icon-badge">
          <Check size={36} strokeWidth={3} />
        </div>

        <h1>Thank you for your order!</h1>
        <p className="subtitle">
          Your order has been received and is being prepared with exceptional care. We have sent a confirmation to your email.
        </p>

        {/* Order Receipt Box */}
        <div className="order-receipt-box">
          <div className="receipt-row">
            <span>Order Reference</span>
            <strong>#{orderId}</strong>
          </div>
          <div className="receipt-row">
            <span>Estimated Delivery</span>
            <strong style={{ color: "var(--brand-700)" }}>{formattedDelivery}</strong>
          </div>
          <div className="receipt-row">
            <span>Payment Method</span>
            <strong style={{ textTransform: "uppercase" }}>{order?.paymentMethod || "Credit / Debit Card"}</strong>
          </div>
          {order && (
            <div className="receipt-row">
              <span>Total Amount Paid</span>
              <strong>{formatPrice(order.total)}</strong>
            </div>
          )}
          {order?.shippingAddress && (
            <div className="receipt-row">
              <span>Delivering to</span>
              <strong>{order.shippingAddress.name}, {order.shippingAddress.city}</strong>
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
          <Link to="/products" className="btn btn-primary btn-lg">
            <span>Continue Shopping</span>
            <ArrowRight size={16} />
          </Link>

          <Link to="/profile" className="btn btn-outline btn-lg">
            <User size={16} />
            <span>View in Account</span>
          </Link>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", marginTop: "32px", fontSize: "12px", color: "var(--slate-400)" }}>
          <ShieldCheck size={16} color="var(--brand-600)" />
          <span>Need help? Contact support@novamart.example anytime</span>
        </div>
      </div>
    </main>
  );
}
