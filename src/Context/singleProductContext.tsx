'use client';

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useParams } from "next/navigation"; // Use next/navigation for route params
import axios from "axios";

interface Product {
  _id: any,
  productName: string;
  productDesc: string;
  productImage: string[]; 
  category: string;
  quantity: number;
  price: number;
  size: string;
  discountPercent: number;
  gender: string;
}

interface SingleProductContextType {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const SingleProductContext = createContext<SingleProductContextType | undefined>(undefined);

export const useSingleProduct = () => {
  const context = useContext(SingleProductContext);
  if (!context) {
    throw new Error("useSingleProduct must be used within a SingleProductProvider");
  }
  return context;
};

interface SingleProductProviderProps {
  children: ReactNode;
}

export const SingleProductProvider = ({ children }: SingleProductProviderProps) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const params = useParams();
  const id = params?.id as string | undefined;

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`/api/product/${id}`)
        .then((response) => {
          setProduct(response.data.product);
          setLoading(false);
        })
        .catch((err) => {
          setError("Failed to fetch product");
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <SingleProductContext.Provider value={{ product, loading, error }}>
      {children}
    </SingleProductContext.Provider>
  );
};

export const useSingleProductContext = () => {
  const context = useContext(SingleProductContext);
  if (!context) {
    throw new Error("Error Fetching Details");
  }
  return context;
};
