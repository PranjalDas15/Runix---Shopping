"use client";

import { useEffect, useState } from "react";
import { useAppSelector } from "@/lib/hooks";
import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const { loading } = useAppSelector((state) => state.products);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="relative">
      <Navbar />
      {children}
    </div>
  );
}