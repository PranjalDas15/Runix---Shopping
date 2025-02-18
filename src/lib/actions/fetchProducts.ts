import { Product } from "@/types/Product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

// export const fetchProducts = createAsyncThunk<Product[]>(
//   "products/fetchProducts",
//   async () => {
//     try {
//       const response = await axios.get("/api/products");
//       if (response.status !== 200) {
//         throw new Error("Failed to fetch products");
//       }
//       return response.data.products;
//     } catch (error: any) {
//       console.log("Error: ", error.message);
//     }
//   }
// );

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
    toast.error("Failed to fetch Products.");
    return [];
  }
}

