import { Link } from "react-router-dom";
import { ArrowRight, Compass } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container section" style={{ textAlign: "center", padding: "100px 20px" }}>
      <div style={{ maxWidth: "480px", margin: "0 auto" }}>
        <div style={{ width: "64px", height: "64px", borderRadius: "50%", background: "var(--brand-50)", color: "var(--brand-700)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
          <Compass size={32} />
        </div>
        <span className="eyebrow" style={{ margin: "0 auto 12px" }}>404 Error</span>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "36px", color: "var(--slate-900)", marginBottom: "12px" }}>
          Page Not Located
        </h1>
        <p style={{ color: "var(--slate-600)", fontSize: "16px", marginBottom: "28px" }}>
          The path you took seems to have moved or does not exist in our current collection.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          <span>Return to Homepage</span>
          <ArrowRight size={16} />
        </Link>
      </div>
    </main>
  );
}
