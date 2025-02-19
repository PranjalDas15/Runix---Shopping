import { Product } from "@/types/Product";

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch('/api/products', {
      next: {revalidate: 60} // --> refreshes every 60seconds
    })
    if(!response.ok){
      throw new Error("Failed to fetch Products.")
    }

    const data = await response.json();
    return data.products;
  } catch (error) {
    return [];
  }
}

