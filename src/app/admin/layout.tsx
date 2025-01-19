"use client";
import Sidebar from "@/components/adminComponents/Sidebar";
import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { redirect } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (user && !loading) {
      if (user.role !== "Seller") {
        redirect("/");
      }
    }
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }
  if(user?.role === 'Seller' && !loading) {
    return (
      <div className="pt-[70px] flex gap-2 h-screen">
      <div className="w-0 md:w-[300px] overflow-hidden">
        <Sidebar />
      </div>
      <div className="w-full">{loading ? <Loading /> : children}</div>
    </div>
    )
  } else {
    return redirect('/')
  }
};

export default layout;
