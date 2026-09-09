import { Navigate, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastContainer from "./components/ToastContainer";
import ScrollToTop from "./components/ScrollToTop";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import { Login, Register } from "./pages/Auth";
import Profile from "./pages/Profile";
import Success from "./pages/Success";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

function RequireLogin({ children }) {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("novamart-user") === "true";
  return isLoggedIn ? children : <Navigate to="/login" replace state={{ from: location }} />;
}

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Landing />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route
          path="/checkout"
          element={
            <RequireLogin>
              <Checkout />
            </RequireLogin>
          }
        />
        <Route
          path="/checkout/success"
          element={
            <RequireLogin>
              <Success />
            </RequireLogin>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <RequireLogin>
              <Profile />
            </RequireLogin>
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </>
  );
}
