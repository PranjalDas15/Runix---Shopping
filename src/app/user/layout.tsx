"use client";

import Loading from "@/components/Loading";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    if (user && !loading) {
      if (user === undefined || null) {
        redirect("/login");
      }
    }
  }, [dispatch]);
  if(loading){
    return <Loading/>
  }

  return <div>{children}</div>;
};

export default layout;
