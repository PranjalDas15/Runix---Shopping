"use client";

import Loading from "@/components/Loading";
import Shop from "@/components/shopComponents/Shop";
import { useProductContext } from "@/Context/productContext";
import { useUser } from "@/Context/userContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";


const page = () => {
  const { wishlist, loading, currnetUser, isLoggedIn } = useUser();



  return (
    <div>
      <div className="min-h-[70vh] w-full bg-white mt-[70px] flex justify-center">
      {loading ? (
        <Loading />
      ) : (
        <div className=" mx-4 py-3 w-full md:w-[70%]">
          <div className="flex gap-1 text-[12px]">
              <Link href={"/"} className="text-orange-400">
                Home
              </Link>
              <p>/</p>
              <Link href={"/user"} className="text-orange-400">
                Profile
              </Link>
              <p>/</p>
              <p> Wishlist</p>
            </div>
          <div className="py-5">
            
            <h1 className="font-bold text-xl md:text-2xl">My Wishlist</h1>
          </div>
          {currnetUser && currnetUser.wishlist.length > 0 ? (
            <Shop value={currnetUser.wishlist} delButton={true}/>
          ) : (
            <div className="w-full h-[50vh] xl:h-[80vh] flex flex-col items-center justify-center gap-10">
              <p className="font-semibold text-xl">Your wishlist is empty!</p>
              <Link
                href={"/shop/Male"}
                className="text-wrap py-2 px-3 border-2 border-orange-400 bg-white hover:bg-orange-400 hover:text-white custom-transition"
              >
                Continue Shopping
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
    </div>
  );
};

export default page;


