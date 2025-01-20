"use client";
import Sidebar from "@/components/adminComponents/Sidebar";
import { File, FilePlus, LayoutDashboard, User } from "lucide-react";
import React, { ReactNode, useState } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const menu = [
    { name: "Dashboard" , icon: <LayoutDashboard/>},
    { name: "Add Products" , icon: <FilePlus/>},
    { name: "My Products", icon: <File/>},
    { name: "Profile" , icon: <User/>},
  ];
  const [value, setValue] = useState("");
  return (
    <div className="flex gap-2 h-screen">
      <div className="w-[60px] xl:w-[300px] h-screen overflow-hidden">
        <Sidebar setValue={setValue} menu={menu} />
      </div>
      <div className="w-full h-screen flex flex-col overflow-y-auto">
        <h1 className="py-6 md:py-12 text-xl md:text-3xl font-bold text-gray-600">{value}</h1>
        <div className="h-full">{children}</div>
      </div>
    </div>
  );
};

export default layout;
