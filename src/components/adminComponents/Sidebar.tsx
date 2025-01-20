"use client";

import { sellerSignOut } from "@/app/login/actions";
import { LogOut, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

const Sidebar = ({
  setValue,
  menu,
}: {
  setValue: React.Dispatch<React.SetStateAction<string>>;
  menu: { name: string; icon: JSX.Element }[];
}) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const handleSignout = async () => {
    const success = await sellerSignOut(dispatch);
    if (success) {
      router.push("/login");
    }
  };
  const url = usePathname();

  useEffect(() => {
    const activeMenu = menu.find(
      (item) => `/admin/${item.name.toLowerCase().replace(/\s+/g, "")}` === url
    );
    if (activeMenu) {
      setValue(activeMenu.name);
    }
  }, [url, menu, setValue]);

  return (
    <div className="h-screen w-full bg-orange-400 py-5 flex flex-col">
      <div className="flex flex-col items-center gap-2 border-b border-white pb-3">
        <div className="w-full h-10 md:h-14 overflow-hidden flex items-center justify-center">
          <Image
            alt="logo"
            src={"/Logotextwhitewhite.png"}
            width={200}
            height={200}
            className="w-full h-full object-contain hidden md:block"
          />
          <Image
            alt="logo"
            src={"/LogoWhite.svg"}
            width={200}
            height={200}
            className="w-full h-full object-contain md:hidden"
          />
        </div>
        <h1 className="text-white text-2xl font-bold text-center hidden md:block">
          Seller Page
        </h1>
      </div>
      <div className="flex flex-col justify-between h-full">
        <div className="flex flex-col gap-3 items-center px-2 pt-10">
          {menu.map((menu, index) => {
            const linkVal = menu.name.replace(/\s+/g, "").toLowerCase();
            const link = `/admin/${linkVal}`;
            return (
              <button
                key={index}
                onClick={() => {
                  router.push(link);
                }}
                className={`flex items-center justify-center xl:justify-start gap-3 xl:px-5 py-2 w-full text-lg rounded-full hover:bg-orange-100 group custom-transition ${
                  link === url ? "bg-orange-100" : "bg-transparent xl:bg-white"
                }`}
              >
                <div className={`flex items-center justify-center  xl:text-black custom-transition  ${link === url ? 'text-orange-400 group-hover:none': 'text-white group-hover:text-orange-400'}`}>
                  {menu.icon}
                </div>
                <p className="hidden xl:block">{menu.name}</p>
              </button>
            );
          })}
        </div>
        <div className="flex flex-col gap-2 px-2">
          <button
            onClick={() => router.push('/')}
            className={`flex items-center justify-center xl:justify-start gap-3 xl:px-5 py-2 w-full text-lg rounded-full hover:bg-orange-100 group custom-transition xl:bg-white`}
          >
            <div className="flex items-center justify-center  xl:text-black text-white group-hover:text-orange-400 custom-transition">
              <ShoppingBag />
            </div>
            <p className="hidden xl:block">Shop</p>
          </button>
          <button
            onClick={() => {
              handleSignout();
            }}
            className={`flex items-center justify-center xl:justify-start gap-3 xl:px-5 py-2 w-full text-lg rounded-full hover:bg-orange-100 group custom-transition xl:bg-white`}
          >
            <div className="flex items-center justify-center  xl:text-black text-white group-hover:text-orange-400 custom-transition">
              <LogOut />
            </div>
            <p className="hidden xl:block">Log out</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
