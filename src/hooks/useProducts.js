import { useEffect, useState } from "react";
import { getProducts } from "../services/api";

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => { getProducts().then(setProducts).catch(() => setError("Could not load products.")).finally(() => setLoading(false)); }, []);
  return { products, loading, error };
}
