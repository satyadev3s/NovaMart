import { Link } from "react-router-dom";
import QuantitySelector from "./QuantitySelector";
import { formatPrice } from "../utils/currency";
import { Trash2 } from "lucide-react";

export default function CartItem({ item, onQuantity, onRemove }) {
  return (
    <div className="cart-item-row">
      <div className="cart-item-img">
        <Link to={`/products/${item.id}`}>
          <img src={item.image} alt={item.title} />
        </Link>
      </div>

      <div className="cart-item-info">
        <Link to={`/products/${item.id}`}>
          <h4>{item.title}</h4>
        </Link>
        <p className="category">{item.category}</p>

        <div className="cart-item-actions">
          <QuantitySelector
            value={item.quantity}
            max={item.stock}
            onChange={onQuantity}
          />
          <button className="btn-remove-item" onClick={onRemove} aria-label="Remove item">
            <Trash2 size={15} />
            <span>Remove</span>
          </button>
        </div>
      </div>

      <div className="cart-item-price">
        <span>{formatPrice(item.price * item.quantity)}</span>
        {item.quantity > 1 && (
          <div style={{ fontSize: "12px", color: "var(--slate-400)", fontWeight: 400 }}>
            {formatPrice(item.price)} each
          </div>
        )}
      </div>
    </div>
  );
}
