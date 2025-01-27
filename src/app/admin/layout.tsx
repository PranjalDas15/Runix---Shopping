"use client";

import Sidebar from "@/components/adminComponents/Sidebar";
import Loading from "@/components/Loading";
import { useAppSelector } from "@/lib/hooks";
import { File, FilePlus, LayoutDashboard, User } from "lucide-react";
import React, { ReactNode, useState } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAppSelector((state) => state.user);
  const menu = [
    { name: "Dashboard", icon: <LayoutDashboard /> },
    { name: "Add Products", icon: <FilePlus /> },
    { name: "My Products", icon: <File /> },
    { name: "Profile", icon: <User /> },
  ];
  const [value, setValue] = useState("");
  return (
    <div className="flex gap-2 h-screen">
      <div className="w-[60px] xl:w-[300px] h-screen overflow-hidden">
        <Sidebar setValue={setValue} menu={menu} />
      </div>
      {loading ? <Loading/> :
      !loading && user?.verified === "Verified" ? (
        <div className="w-full h-screen flex flex-col overflow-y-auto">
          <h1 className="py-6 md:py-12 text-xl md:text-3xl font-bold text-gray-600">
            {value}
          </h1>
          <div className="h-full">{children}</div>
        </div>
      ) : (
        <div className="w-full flex flex-col items-center justify-center text-[30px] lg:text-[50px] text-gray-500 font-semibold">
          <p>Not verified yet.</p>
          <p>Wait for admin to verify you.</p>
        </div>
      )}
    </div>
  );
};

export default layout;
