import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

function finishLogin(navigate, from) {
  localStorage.setItem("novamart-user", "true");
  navigate(from || "/products", { replace: true });
}

const getAccounts = () => {
  try {
    return JSON.parse(localStorage.getItem("novamart-accounts") || "[]");
  } catch {
    return [];
  }
};

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function handleDemoFill() {
    setEmail("alex.morgan@example.com");
    setPhone("+91 98765 43210");
    setPassword("password123");
    // Ensure the demo account exists in localStorage
    const accounts = getAccounts();
    if (!accounts.some((a) => a.email === "alex.morgan@example.com")) {
      accounts.push({
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        phone: "+91 98765 43210",
        password: "password123",
      });
      localStorage.setItem("novamart-accounts", JSON.stringify(accounts));
    }
    setError("");
  }

  function submit(e) {
    e.preventDefault();
    if (!email || !password) {
      return setError("Please enter your email and password.");
    }

    const accounts = getAccounts();
    // Allow either exact match or fallback demo login
    let account = accounts.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
    );

    // If demo credentials or first time demo
    if (!account && email.trim() === "alex.morgan@example.com") {
      account = { name: "Alex Morgan", email: "alex.morgan@example.com", phone: "+91 98765 43210" };
    }

    if (!account) {
      return setError("Invalid email or password. Use demo fill button above to test instantly.");
    }

    localStorage.setItem(
      "novamart-profile",
      JSON.stringify({ name: account.name, email: account.email, phone: account.phone })
    );

    const from = location.state?.from;
    finishLogin(navigate, from ? `${from.pathname}${from.search}` : undefined);
  }

  return (
    <main className="auth-page-container">
      <div className="auth-split-card">
        {/* Left Side: Brand Visual */}
        <div className="auth-banner-side">
          <span className="eyebrow" style={{ background: "rgba(255,255,255,0.2)", color: "var(--white)" }}>
            Nova Club
          </span>
          <div>
            <h2>Welcome to thoughtful living.</h2>
          </div>
          <p className="auth-banner-quote">
            "Design is not just what it looks like and feels like. Design is how it works."
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <span className="eyebrow">
            <Sparkles size={12} /> Sign In
          </span>
          <h2>Welcome Back</h2>
          <p className="desc">Enter your details to access your account & orders.</p>

          {/* 1-Click Demo Helper */}
          <div className="demo-account-hint">
            <span>Fast test? Use preloaded demo account.</span>
            <button type="button" onClick={handleDemoFill}>
              1-Click Demo Fill
            </button>
          </div>

          {error && (
            <div className="form-error-banner" style={{ marginBottom: "16px" }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit} className="auth-form">
            <div className="form-group">
              <label>Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
              />
            </div>

            <div className="form-group">
              <label>Phone Number (Optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98765 43210"
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--slate-400)",
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-full" style={{ marginTop: "8px" }}>
              <span>Sign In to Account</span>
              <ArrowRight size={16} />
            </button>

            <p style={{ textAlign: "center", fontSize: "14px", color: "var(--slate-500)", marginTop: "12px" }}>
              New to NovaMart?{" "}
              <Link to="/register" style={{ color: "var(--brand-700)", fontWeight: 600 }}>
                Create an account
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}

export function Register() {
  const navigate = useNavigate();
  const location = useLocation();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) {
      return setError("Please complete every field.");
    }
    if (form.password.length < 6) {
      return setError("Password must contain at least 6 characters.");
    }
    if (form.password !== form.confirm) {
      return setError("Passwords do not match.");
    }

    const accounts = getAccounts();
    if (accounts.some((a) => a.email.toLowerCase() === form.email.trim().toLowerCase())) {
      return setError("An account with this email address already exists.");
    }

    const account = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    };

    localStorage.setItem("novamart-accounts", JSON.stringify([...accounts, account]));
    localStorage.setItem(
      "novamart-profile",
      JSON.stringify({ name: account.name, email: account.email, phone: account.phone })
    );

    const from = location.state?.from;
    finishLogin(navigate, from ? `${from.pathname}${from.search}` : undefined);
  }

  return (
    <main className="auth-page-container">
      <div className="auth-split-card">
        {/* Left Side: Brand Visual */}
        <div className="auth-banner-side">
          <span className="eyebrow" style={{ background: "rgba(255,255,255,0.2)", color: "var(--white)" }}>
            Join Us
          </span>
          <div>
            <h2>Become a member of NovaMart.</h2>
          </div>
          <p className="auth-banner-quote">
            Enjoy complimentary express shipping, private seasonal drops, and concierge support.
          </p>
        </div>

        {/* Right Side: Form */}
        <div className="auth-form-side">
          <span className="eyebrow">
            <Sparkles size={12} /> Register
          </span>
          <h2>Create Account</h2>
          <p className="desc">Join our shopping community in just a few clicks.</p>

          {error && (
            <div className="form-error-banner" style={{ marginBottom: "16px" }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={submit} className="auth-form">
            <div className="form-group">
              <label>Full Name</label>
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
              <label>Phone Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98765 43210"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div style={{ position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="At least 6 characters"
                  value={form.password}
                  onChange={(e) => setForm({ ...form, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "12px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "var(--slate-400)",
                  }}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>
              <input
                type="password"
                required
                placeholder="Re-enter password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg btn-full" style={{ marginTop: "8px" }}>
              <span>Create Account</span>
              <ArrowRight size={16} />
            </button>

            <p style={{ textAlign: "center", fontSize: "14px", color: "var(--slate-500)", marginTop: "12px" }}>
              Already registered?{" "}
              <Link to="/login" style={{ color: "var(--brand-700)", fontWeight: 600 }}>
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
