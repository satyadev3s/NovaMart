import { products } from "../data/products";

// Replace this mock function with fetch('/api/products') when the backend is ready.
export async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 250));
  return products;
}
