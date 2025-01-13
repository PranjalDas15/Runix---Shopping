"use client";

import Cart from "@/components/Cart";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import Link from "next/link";

const page = () => {
  const { user } = useAppSelector((state: RootState) => state.user);
  return (
    <div className="w-full min-h-[70vh] flex justify-center">
      <div className="min-h-[70vh] w-full bg-white mt-[70px] flex justify-center">
        <div className=" mx-4 py-3 w-full lg:w-[60%]">
          <div className="flex gap-1 text-[12px]">
            <Link href={"/"} className="text-orange-400">
              Home
            </Link>
            <p>/</p>
            <Link href={"/user"} className="text-orange-400">
              Profile
            </Link>
            <p>/</p>
            <p> Cart</p>
          </div>
          <div className="py-5">
            <h1 className="font-bold text-xl md:text-2xl">My Cart</h1>
          </div>
          {user?.cart.length === 0 ? (
            <div className="w-full h-[50vh] xl:h-[80vh] flex flex-col items-center justify-center gap-10">
              <p className="font-semibold text-xl">Your cart is empty!</p>
              <Link
                href={"/shop"}
                className="text-wrap py-2 px-3 border-2 border-orange-400 bg-white hover:bg-orange-400 hover:text-white custom-transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <Cart />
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
