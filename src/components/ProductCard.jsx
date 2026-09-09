import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { formatPrice } from "../utils/currency";
import { Heart, Star, ShoppingBag, ArrowUpRight } from "lucide-react";

export default function ProductCard({ product }) {
  const { addToCart, wishlist, toggleWishlist } = useCart();
  const isSaved = wishlist.some((item) => item.id === product.id);

  return (
    <article className="product-card">
      <div className="product-card-thumb">
        <Link to={`/products/${product.id}`} aria-label={product.title}>
          <img src={product.image} alt={product.title} loading="lazy" />
        </Link>

        {/* Floating Badges */}
        <div className="product-pill-tags">
          {product.discount > 0 && (
            <span className="tag-discount">-{product.discount}%</span>
          )}
          {product.bestseller && (
            <span className="tag-bestseller">Bestseller</span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          className={`btn-wishlist ${isSaved ? "active" : ""}`}
          onClick={() => toggleWishlist(product)}
          aria-label={isSaved ? "Remove from wishlist" : "Save to wishlist"}
          title={isSaved ? "Remove from wishlist" : "Save to wishlist"}
        >
          <Heart size={18} fill={isSaved ? "currentColor" : "none"} />
        </button>
      </div>

      <div className="product-card-content">
        <div className="product-category-row">
          <span className="product-category">{product.category}</span>
          <div className="product-rating">
            <Star size={13} fill="currentColor" />
            <span>{product.rating?.toFixed(1) || "4.5"}</span>
            <span style={{ color: "var(--slate-400)", fontSize: "11px" }}>
              ({product.reviews || 42})
            </span>
          </div>
        </div>

        <Link to={`/products/${product.id}`}>
          <h3 className="product-title">{product.title}</h3>
        </Link>

        <div className="product-card-footer">
          <div className="price-box">
            <span className="price-current">{formatPrice(product.price)}</span>
            {product.originalPrice > product.price && (
              <span className="price-original">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          <button
            className="btn-quick-add"
            onClick={() => addToCart(product)}
            title="Add to shopping bag"
          >
            <ShoppingBag size={14} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </article>
  );
}
