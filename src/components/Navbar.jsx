import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import {
  ShoppingBag,
  Heart,
  User,
  Menu,
  X,
  Search,
  Sparkles,
  ArrowRight,
  LogOut,
  ChevronRight,
} from "lucide-react";

export default function Navbar() {
  const { cartCount, wishlistCount } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("novamart-user") === "true";
  const userProfile = JSON.parse(localStorage.getItem("novamart-profile") || "null");

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (navSearch.trim()) {
      navigate(`/products?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
      setMobileMenuOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("novamart-user");
    navigate("/", { replace: true });
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <Sparkles size={13} className="sparkle-icon" />
        <span>Complimentary Express Delivery on orders over ₹5,000</span>
        <span className="pill-code">WELCOME10</span>
        <span>for 10% off</span>
      </div>

      {/* Main Sticky Header */}
      <header className="site-header">
        <div className="container">
          <nav className="navbar">
            {/* Mobile Hamburger Button */}
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            {/* Brand Logo */}
            <Link to="/" className="nav-brand">
              <div className="brand-logo-icon">
                <Sparkles size={18} />
              </div>
              <span>NOVA</span>
              <span className="accent">MART</span>
            </Link>

            {/* Desktop Navigation Links */}
            <div className="nav-links-desktop">
              <NavLink to="/" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")} end>
                Home
              </NavLink>
              <NavLink to="/products" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Shop All
              </NavLink>
              <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                About
              </NavLink>
              <NavLink to="/contact" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
                Contact
              </NavLink>
            </div>

            {/* Search Input Bar (Desktop) */}
            <form onSubmit={handleSearchSubmit} className="search-field-modern desktop-nav-search">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search collection..."
              />
            </form>

            {/* Navigation Actions */}
            <div className="nav-actions">
              {/* Wishlist Link */}
              <Link to="/wishlist" className="nav-icon-btn" aria-label="Wishlist" title="Saved items">
                <Heart size={20} />
                {wishlistCount > 0 && <span className="badge-count wishlist-badge">{wishlistCount}</span>}
              </Link>

              {/* Shopping Bag Link */}
              <Link to="/cart" className="nav-icon-btn" aria-label="Shopping Bag" title="Shopping bag">
                <ShoppingBag size={20} />
                {cartCount > 0 && <span className="badge-count">{cartCount}</span>}
              </Link>

              {/* User Profile / Auth Action */}
              {isLoggedIn ? (
                <Link to="/profile" className="user-chip" title="Account profile">
                  <div className="user-avatar-mini">
                    {userProfile?.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="user-chip-name">{userProfile?.name?.split(" ")[0] || "Account"}</span>
                </Link>
              ) : (
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <Link to="/login" className="btn btn-ghost btn-sm">
                    <User size={15} />
                    <span>Sign In</span>
                  </Link>
                  <Link to="/register" className="btn btn-primary btn-sm">
                    <span>Register</span>
                  </Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer-header">
              <Link to="/" className="nav-brand" onClick={() => setMobileMenuOpen(false)}>
                <div className="brand-logo-icon">
                  <Sparkles size={16} />
                </div>
                <span>NOVA</span>
                <span className="accent">MART</span>
              </Link>
              <button
                className="nav-icon-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search inside Drawer */}
            <form onSubmit={handleSearchSubmit} className="search-field-modern" style={{ marginBottom: "20px" }}>
              <Search size={16} className="search-icon" />
              <input
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                placeholder="Search products..."
              />
            </form>

            <div className="mobile-drawer-links">
              <NavLink
                to="/"
                className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                onClick={() => setMobileMenuOpen(false)}
                end
              >
                <span>Home</span>
                <ChevronRight size={16} />
              </NavLink>
              <NavLink
                to="/products"
                className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Shop Collection</span>
                <ChevronRight size={16} />
              </NavLink>
              <NavLink
                to="/wishlist"
                className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Wishlist ({wishlistCount})</span>
                <Heart size={16} />
              </NavLink>
              <NavLink
                to="/cart"
                className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Bag ({cartCount})</span>
                <ShoppingBag size={16} />
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>About Us</span>
                <ChevronRight size={16} />
              </NavLink>
              <NavLink
                to="/contact"
                className={({ isActive }) => (isActive ? "mobile-nav-link active" : "mobile-nav-link")}
                onClick={() => setMobileMenuOpen(false)}
              >
                <span>Contact & Support</span>
                <ChevronRight size={16} />
              </NavLink>
            </div>

            <div className="mobile-drawer-footer">
              {isLoggedIn ? (
                <>
                  <Link
                    to="/profile"
                    className="btn btn-outline btn-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>My Profile</span>
                  </Link>
                  <button className="btn btn-ghost btn-full" onClick={handleLogout}>
                    <LogOut size={16} />
                    <span>Sign Out</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="btn btn-primary btn-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Sign In</span>
                  </Link>
                  <Link
                    to="/register"
                    className="btn btn-outline btn-full"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Create Account</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
