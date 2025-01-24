import { Product } from "@/types/Product";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("/api/products");
      if (response.status !== 200) {
        throw new Error("Failed to fetch products");
      }
      return response.data.products;
    } catch (error: any) {
      console.log("Error: ", error.message);
    }
  }
);

