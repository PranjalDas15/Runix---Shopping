'use client';

import { Product } from "@/types/Product";
import React, { useContext, createContext, useState, useEffect, ReactNode } from "react";

interface ProductContextProps {
  products: Product[];
  loading: boolean; 
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  menuHidden: boolean; 
  setMenuHidden: React.Dispatch<React.SetStateAction<boolean>>
  categoryValue: string | null;
  setCategoryValue: React.Dispatch<React.SetStateAction<string | null>>;
  genderValue: string | null;
  setGenderValue: React.Dispatch<React.SetStateAction<string | null>>;
}

const ProductContext = createContext<ProductContextProps>({
  products: [],
  setProducts: () => {},
  loading: true,
  setLoading: () => {},
  menuHidden: true,
  setMenuHidden: () => {},
  categoryValue: null,
  setCategoryValue: () => {},
  genderValue: null,
  setGenderValue: () => {},
});

interface ProductContextProviderProps {
  children: ReactNode; 
}

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [categoryValue, setCategoryValue] = useState<string | null>(null);
  const [genderValue, setGenderValue] = useState<string | null>(null);
  const [ menuHidden, setMenuHidden ] = useState<boolean>(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`Failed to fetch products: ${response.statusText}`);
        }

        const data = await response.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider value={{ products, setProducts , loading, setLoading, categoryValue, setCategoryValue, genderValue, setGenderValue, menuHidden, setMenuHidden}}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error(
      "Error Fetching Details"
    );
  }
  return context;
};
