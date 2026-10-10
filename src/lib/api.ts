import { Category, Product } from "./types";

const BASE_URLS = [
  "https://openapi.programming-hero.com/api/bazardor",
  "https://api.api-store.workers.dev/api/bazardor",
  "https://api.abcz.workers.dev/api/bazardor",
];

async function getData<T>(path: string): Promise<T | null> {
  for (const base of BASE_URLS) {
    try {
      const res = await fetch(`${base}${path}`, {
        next: { revalidate: 600 },
      });
      if (!res.ok) {
        console.error("API failed:", base + path, res.status);
        continue;
      }
      return await res.json();
    } catch (error) {
      console.error("API error:", base + path, error);
    }
  }
  return null;
}


export async function getProducts(category?: string) {
  const path = category ? `/products?category=${category}` : "/products";
  const products = await getData<Product[]>(path);
  return Array.isArray(products) ? products : [];
}

export async function getCategories() {
  const categories = await getData<Category[]>("/categories");
  return Array.isArray(categories) ? categories : [];
}
export async function getCategory(slug: string) {
  return getData<Category>(`/categories/${slug}`);
}

// url e slug ache kintu api id diye single product dey, tai age slug diye khuje nei
export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  const found = products.find((p) => p.slug === slug);
  if (!found) return null;

  const full = await getData<Product>(`/products/${found.id}`);
  return full ?? found;
}