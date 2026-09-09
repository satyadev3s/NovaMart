import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { Eye, EyeOff, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

function finishLogin(navigate, location, addToCart, addToast) {
  localStorage.setItem("novamart-user", "true");

  if (location?.state?.pendingItem && addToCart) {
    addToCart(location.state.pendingItem, location.state.pendingQty || 1, false);
    if (addToast) {
      addToast(`Welcome! Added "${location.state.pendingItem.title}" to your bag.`, "success");
    }
  }

  const from = location?.state?.from;
  let target = "/products";
  if (typeof from === "string") {
    target = from;
  } else if (from?.pathname) {
    target = `${from.pathname}${from.search || ""}`;
  }

  navigate(target, { replace: true });
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
  const { addToCart, addToast } = useCart();

  const registeredEmail = location.state?.registeredEmail || "";
  const registeredSuccess = location.state?.registeredSuccess || false;

  const [email, setEmail] = useState(() => {
    if (registeredEmail) return registeredEmail;
    try {
      const lastReg = JSON.parse(localStorage.getItem("novamart-last-registered") || "null");
      return lastReg?.email || "";
    } catch {
      return "";
    }
  });

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState(
    registeredSuccess ? "Account created successfully! Enter your password to sign in." : ""
  );

  const pendingItem = location.state?.pendingItem;

  useEffect(() => {
    if (registeredEmail) {
      setEmail(registeredEmail);
    }
  }, [registeredEmail]);

  function handleDemoFill() {
    setEmail("alex.morgan@example.com");
    setPassword("password123");
    // Ensure the demo account exists in localStorage
    const existing = getAccounts();
    if (!existing.some((a) => a.email === "alex.morgan@example.com")) {
      existing.push({
        name: "Alex Morgan",
        email: "alex.morgan@example.com",
        phone: "+91 98765 43210",
        password: "password123",
      });
      localStorage.setItem("novamart-accounts", JSON.stringify(existing));
    }
    setError("");
  }


  function submit(e) {
    e.preventDefault();
    if (!email || !password) {
      return setError("Please enter your email and password.");
    }

    const currentAccounts = getAccounts();
    let account = currentAccounts.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
    );

    // If demo fallback
    if (!account && email.trim().toLowerCase() === "alex.morgan@example.com" && password === "password123") {
      account = { name: "Alex Morgan", email: "alex.morgan@example.com", phone: "+91 98765 43210" };
    }

    if (!account) {
      return setError("Invalid email or password. Please verify your registered credentials.");
    }

    // Save active logged-in user profile
    localStorage.setItem(
      "novamart-profile",
      JSON.stringify({ name: account.name, email: account.email, phone: account.phone })
    );

    finishLogin(navigate, location, addToCart, addToast);
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
          <p className="desc">
            {pendingItem
              ? `Sign in with your registered account to add "${pendingItem.title}" to your cart.`
              : "Enter your registered credentials to access your account & orders."}
          </p>

          {/* Success Banner if redirected from registration */}
          {successMsg && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "var(--brand-50)",
                border: "1px solid var(--brand-500)",
                color: "var(--brand-900)",
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                fontSize: "13px",
                marginBottom: "16px",
              }}
            >
              <CheckCircle2 size={16} color="var(--brand-600)" />
              <span>{successMsg}</span>
            </div>
          )}

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
              Need a new account?{" "}
              <Link
                to="/register"
                state={location.state}
                style={{ color: "var(--brand-700)", fontWeight: 700, textDecoration: "underline" }}
              >
                Register here
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
  const { addToast } = useCart();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const pendingItem = location.state?.pendingItem;

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
      return setError("An account with this email address already exists. Please sign in.");
    }

    const account = {
      name: form.name.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      password: form.password,
    };

    // Save to accounts list
    localStorage.setItem("novamart-accounts", JSON.stringify([...accounts, account]));
    // Save last registered for instant prefill
    localStorage.setItem("novamart-last-registered", JSON.stringify(account));

    addToast(`Account created for ${account.name}! Please sign in.`, "success");

    // Redirect to login with registered credentials prefilled
    navigate("/login", {
      replace: true,
      state: {
        ...location.state,
        registeredEmail: account.email,
        registeredSuccess: true,
      },
    });
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
          <p className="desc">
            {pendingItem
              ? `Create your account to access and add "${pendingItem.title}" to your cart.`
              : "Register your account to shop, save wishlist items, and track orders."}
          </p>

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
              <span>Register & Continue to Sign In</span>
              <ArrowRight size={16} />
            </button>

            <p style={{ textAlign: "center", fontSize: "14px", color: "var(--slate-500)", marginTop: "12px" }}>
              Already registered?{" "}
              <Link
                to="/login"
                state={location.state}
                style={{ color: "var(--brand-700)", fontWeight: 700, textDecoration: "underline" }}
              >
                Sign in here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </main>
  );
}
