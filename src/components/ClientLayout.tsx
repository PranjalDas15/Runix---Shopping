"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { products, loading } = useAppSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading && products) {
      setIsLoading(false);
    }
  }, [loading, products]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <Navbar />
      {children}
    </div>
  );
}