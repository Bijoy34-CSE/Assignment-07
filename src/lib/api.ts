import { Category, Product } from "./types";

const BASE_URL = "https://api.api-store.workers.dev/api/bazardor";

async function getData<T>(path: string): Promise<T | null> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

export async function getProducts(category?: string) {
  const path = category ? `/products?category=${category}` : "/products";
  const products = await getData<Product[]>(path);
  return products ?? [];
}

export async function getCategories() {
  const categories = await getData<Category[]>("/categories");
  return categories ?? [];
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