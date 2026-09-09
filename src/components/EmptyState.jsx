import { Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";

export default function EmptyState({
  icon: Icon = ShoppingBag,
  title = "Nothing here yet",
  text = "Discover thoughtful essentials in our catalog.",
  link = "/products",
  buttonText = "Explore Collection",
}) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-icon">
        <Icon size={34} />
      </div>
      <h2>{title}</h2>
      <p>{text}</p>
      {link && (
        <Link to={link} className="btn btn-primary">
          <span>{buttonText}</span>
          <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}
