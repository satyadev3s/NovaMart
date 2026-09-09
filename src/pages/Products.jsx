import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useProducts } from "../hooks/useProducts";
import ProductGrid from "../components/ProductGrid";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { categories } from "../data/products";
import {
  Search,
  X,
  SlidersHorizontal,
  ChevronDown,
  LayoutGrid,
  List,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  FilterX,
} from "lucide-react";

export default function Products() {
  const { products, loading, error } = useProducts();
  const [params, setParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [viewMode, setViewMode] = useState("grid");

  const search = params.get("search") || "";
  const category = params.get("category") || "All";
  const sort = params.get("sort") || "featured";
  const rating = Number(params.get("rating") || 0);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value && value !== "All" && value !== "0" && value !== "featured") {
      next.set(key, value);
    } else {
      next.delete(key);
    }
    setParams(next);
  };

  const clearAllFilters = () => {
    setParams(new URLSearchParams());
  };

  useEffect(() => {
    setPage(1);
  }, [search, category, sort, rating]);

  const filtered = useMemo(() => {
    return products
      .filter((p) => {
        const matchesSearch =
          !search ||
          p.title.toLowerCase().includes(search.toLowerCase()) ||
          p.category.toLowerCase().includes(search.toLowerCase());
        const matchesCat = category === "All" || p.category === category;
        const matchesRating = !rating || p.rating >= rating;
        return matchesSearch && matchesCat && matchesRating;
      })
      .sort((a, b) => {
        if (sort === "low") return a.price - b.price;
        if (sort === "high") return b.price - a.price;
        if (sort === "rating") return b.rating - a.rating;
        return 0; // featured
      });
  }, [products, search, category, rating, sort]);

  const itemsPerPage = 8;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const currentItems = filtered.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const hasActiveFilters = search || (category && category !== "All") || rating > 0 || (sort && sort !== "featured");

  if (loading) return <Loader />;

  return (
    <main className="container section">
      {/* Header Banner */}
      <div className="section-header flex-between" style={{ marginBottom: "24px" }}>
        <div>
          <span className="eyebrow">
            <Sparkles size={12} /> The Catalog
          </span>
          <h1>All Products</h1>
          <p className="subtitle">
            Showing {filtered.length} {filtered.length === 1 ? "piece" : "pieces"} thoughtfully curated for modern living.
          </p>
        </div>

        {/* View Switcher Desktop */}
        <div className="view-mode-toggle" style={{ display: "flex" }}>
          <button
            className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
            onClick={() => setViewMode("grid")}
            title="Grid View"
            aria-label="Grid View"
          >
            <LayoutGrid size={18} />
          </button>
          <button
            className={`view-btn ${viewMode === "list" ? "active" : ""}`}
            onClick={() => setViewMode("list")}
            title="List View"
            aria-label="List View"
          >
            <List size={18} />
          </button>
        </div>
      </div>

      {/* Filter & Controls Panel */}
      <div className="filter-wrapper">
        {/* Category Pills Bar */}
        <div className="category-pills-scroll">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`cat-pill-btn ${category === cat ? "active" : ""}`}
              onClick={() => updateParam("category", cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter Toolbar */}
        <div className="filter-bar-controls">
          {/* Live Search */}
          <div className="search-field-modern">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              value={search}
              onChange={(e) => updateParam("search", e.target.value)}
              placeholder="Search by title or style..."
            />
            {search && (
              <button
                className="search-clear"
                onClick={() => updateParam("search", "")}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Select Controls Group */}
          <div className="filter-selects-group">
            {/* Sort Select */}
            <div className="custom-select-wrap">
              <select
                value={sort}
                onChange={(e) => updateParam("sort", e.target.value)}
                aria-label="Sort products"
              >
                <option value="featured">Sort: Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="rating">Top Customer Rated</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>

            {/* Rating Filter Select */}
            <div className="custom-select-wrap">
              <select
                value={rating.toString()}
                onChange={(e) => updateParam("rating", e.target.value)}
                aria-label="Filter by rating"
              >
                <option value="0">All Ratings</option>
                <option value="4.5">★ 4.5 & above</option>
                <option value="4.7">★ 4.7 & above</option>
              </select>
              <ChevronDown size={14} className="select-arrow" />
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {hasActiveFilters && (
          <div className="active-filter-chips">
            <span style={{ color: "var(--slate-500)", fontWeight: 500 }}>Active filters:</span>
            {search && (
              <span className="chip-tag">
                <span>Keyword: "{search}"</span>
                <button onClick={() => updateParam("search", "")}><X size={12} /></button>
              </span>
            )}
            {category && category !== "All" && (
              <span className="chip-tag">
                <span>Category: {category}</span>
                <button onClick={() => updateParam("category", "All")}><X size={12} /></button>
              </span>
            )}
            {rating > 0 && (
              <span className="chip-tag">
                <span>Rating: {rating}+ Stars</span>
                <button onClick={() => updateParam("rating", "0")}><X size={12} /></button>
              </span>
            )}
            {sort && sort !== "featured" && (
              <span className="chip-tag">
                <span>Sorted by: {sort}</span>
                <button onClick={() => updateParam("sort", "featured")}><X size={12} /></button>
              </span>
            )}
            <button className="btn-clear-all" onClick={clearAllFilters}>
              Reset all
            </button>
          </div>
        )}
      </div>

      {/* Main Results Display */}
      {error ? (
        <div style={{ padding: "40px", textAlign: "center", color: "var(--rose-600)" }}>
          <p>{error}</p>
        </div>
      ) : currentItems.length > 0 ? (
        <>
          <ProductGrid products={currentItems} viewMode={viewMode} />

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="pagination-container">
              <button
                className="pagination-btn"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                aria-label="Previous page"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  className={`pagination-btn ${page === index + 1 ? "active" : ""}`}
                  onClick={() => setPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}

              <button
                className="pagination-btn"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                aria-label="Next page"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </>
      ) : (
        <EmptyState
          icon={FilterX}
          title="No products found"
          text="We couldn't find any items matching your selected criteria. Try adjusting your filters."
          link={null}
          buttonText=""
        />
      )}
    </main>
  );
}
