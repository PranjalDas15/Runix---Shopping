"use client";

import { categoriesFemale, categoriesMale } from "@/lib/assets";
import { Heart, LogIn, LogOut, ShoppingCart, User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./ui/MobileMenu";
import CategoryMenu from "./ui/CategoryMenu";
import { redirect, usePathname } from "next/navigation";
import { useDispatch } from "react-redux";
import { setCategoryValue } from "@/lib/features/productSlice";
import { signOut } from "@/app/login/actions";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";

function Navbar() {
  const dispatch = useDispatch();
  const { user, newlyAddedtoWishlist, newlyAddedtoCart } = useAppSelector(
    (state) => state.user
  );
  const [menuHidden, setMenuHidden] = useState<boolean>(true);

  const handleSignout = async () => {
    const success = await signOut(dispatch);
    if (success) {
      redirect("/login");
    }
  };

  const url = usePathname();
  console.log("URL: ", url);

  if (url.startsWith("/admin")) {
    return null;
  } else {
    return (
      <div className="w-screen h-[70px] fixed top-0 z-50 bg-gradient-to-b from-black to-transparent flex justify-around items-center text-white">
        {/* Mobile Menu Section starts */}
        <button
          onClick={() => setMenuHidden(!menuHidden)}
          className="flex md:hidden items-center justify-center text-xl z-50"
        >
          <div className="flex flex-col gap-1.5 text-red-200">
            <div
              className={`w-7  h-[4px] origin-left custom-transition ${
                menuHidden ? "rotate-0 bg-white" : "rotate-45 bg-orange-400"
              }`}
            ></div>
            <div
              className={`w-7 h-[4px] bg-white custom-transition ${
                menuHidden ? "opacity-100" : "opacity-0"
              }`}
            ></div>
            <div
              className={`w-7 h-[4px]  origin-left custom-transition ${
                menuHidden ? "rotate-0 bg-white" : "-rotate-45 bg-orange-400"
              }`}
            ></div>
          </div>
        </button>
        <div
          className={`absolute top-0 w-screen h-screen flex custom-transition ${
            menuHidden ? "-translate-x-full" : "translate-x-0"
          }`}
        >
          <div className="bg-white w-full">
            <MobileMenu
              signOut={handleSignout}
              menuHidden={menuHidden}
              setMenuHidden={setMenuHidden}
            />
          </div>
        </div>

        {/* Mobile Menu Section ends */}

        {/* Navbar Menu Section starts */}

        <Link href={"/"} className="w-20 h-20 flex items-center z-50">
          <Image
            alt="logo"
            width={200}
            height={200}
            src={menuHidden ? "/Logotextwhite.svg" : "/Logotextblack.svg"}
          />
        </Link>

        <ul className="flex gap-5 items-center h-full">
          <li className="hidden md:grid grid-cols-2 gap-5 h-full text-center">
            <div className="relative overflow-hidden group">
              <div className="w-full h-full text-center flex items-center justify-center">
                <Link
                  href={"/shop?gender=male"}
                  onClick={() => dispatch(setCategoryValue(""))}
                >
                  MEN
                </Link>
              </div>
              <div className="absolute bottom-0 w-full h-[4px] bg-orange-500 custom-transition translate-y-full group-hover:translate-y-0"></div>
              <div className="fixed top-[70px] left-0 w-full hidden group-hover:block pb-5 border-b border-orange-400 bg-white">
                <CategoryMenu value={categoriesMale} gender="Male" />
              </div>
            </div>
            <div className="relative overflow-hidden group">
              <div className="w-full h-full text-center flex items-center justify-center">
                <Link
                  href={"/shop?gender=female"}
                  onClick={() => dispatch(setCategoryValue(""))}
                >
                  WOMEN
                </Link>
              </div>
              <div className="absolute bottom-0 w-full h-[4px] bg-orange-500 custom-transition translate-y-full group-hover:translate-y-0"></div>
              <div className="fixed top-[70px] left-0 w-full hidden group-hover:block pb-5 border-b border-orange-400 bg-white">
                <CategoryMenu value={categoriesFemale} gender="Female" />
              </div>
            </div>
          </li>

          <li
            onClick={() => redirect("/user/wishlist")}
            className="relative cursor-pointer"
          >
            <Heart className="hover:fill-current text-red-400" />
            <div
              className={`absolute top-0 right-0 w-2.5 h-2.5 translate-x-1 bg-red-500 rounded-full ${
                newlyAddedtoWishlist ? "block" : "hidden"
              }`}
            />
          </li>
          <li
            onClick={() => redirect("/user/cart")}
            className="relative cursor-pointer"
          >
            <ShoppingCart className="hover:fill-current" />
            <div
              className={`absolute top-0 right-0 w-2.5 h-2.5 translate-x-1 bg-red-500 rounded-full ${
                newlyAddedtoCart ? "block" : "hidden"
              }`}
            />
          </li>
          {user ? (
            <div className="hidden md:block group relative custor-pointer">
              <User2 className={`hover:fill-current`} />
              <div className="absolute hidden group-hover:flex justify-center items-end top-[20px] w-[200px] text-black">
                <div className="w-full pt-[20px]">
                  <div className="w-full bg-white flex flex-col gap-2">
                    <button
                      onClick={() => redirect("/user")}
                      className={`border w-full h-full hover:bg-orange-100 custom-transition py-3 ${
                        user.role === "Customer" ? "block" : "hidden"
                      }`}
                    >
                      USER
                    </button>
                    <button
                      onClick={() => redirect("/user/order")}
                      className={`border w-full h-full hover:bg-orange-100 custom-transition py-3 ${
                        user.role === "Customer" ? "block" : "hidden"
                      }`}
                    >
                      MY ORDERS
                    </button>
                    <button
                      onClick={() => redirect("/admin")}
                      className={`border w-full h-full hover:bg-orange-100 custom-transition py-3 ${
                        user.role === "Customer" ? "hidden" : "block"
                      }`}
                    >
                      DASHBOARD
                    </button>
                    <button
                      onClick={() => handleSignout()}
                      className="flex justify-center items-center border w-full h-full hover:bg-red-200 custom-transition py-3"
                    >
                      <LogOut />
                      <p>LOGOUT</p>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="hidden md:block"
              onClick={() => redirect("/login")}
            >
              <LogIn className="hover:fill-current" />
            </button>
          )}
        </ul>
        {/* Navbar Menu Section ends */}
      </div>
    );
  }
}

export default Navbar;
