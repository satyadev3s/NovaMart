import ProductCard from "./ProductCard";

export default function ProductGrid({ products = [], viewMode = "grid" }) {
  if (!products.length) return null;

  return (
    <div className={`product-grid ${viewMode === "list" ? "list-view" : ""}`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
