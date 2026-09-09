import { useCart } from "../context/CartContext";
import ProductGrid from "../components/ProductGrid";
import EmptyState from "../components/EmptyState";
import { Heart, ShoppingBag, ArrowRight } from "lucide-react";

export default function Wishlist() {
  const { wishlist, moveToCart, addToCart } = useCart();

  const handleMoveAllToBag = () => {
    wishlist.forEach((item) => {
      addToCart(item, 1, false);
    });
  };

  return (
    <main className="container section">
      <div className="section-header flex-between">
        <div>
          <span className="eyebrow">
            <Heart size={12} fill="currentColor" /> Saved For Later
          </span>
          <h1>My Wishlist ({wishlist.length})</h1>
          <p className="subtitle">
            All your favorite pieces gathered in one thoughtful place.
          </p>
        </div>

        {wishlist.length > 0 && (
          <button className="btn btn-outline" onClick={handleMoveAllToBag}>
            <ShoppingBag size={16} />
            <span>Move All to Bag</span>
          </button>
        )}
      </div>

      {wishlist.length > 0 ? (
        <ProductGrid products={wishlist} />
      ) : (
        <EmptyState
          icon={Heart}
          title="Your wishlist is waiting"
          text="Save pieces you love while browsing, and they will be waiting here whenever you're ready."
          link="/products"
          buttonText="Explore Collection"
        />
      )}
    </main>
  );
}
