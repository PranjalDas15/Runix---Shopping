"use client";

import { categoriesFemale, categoriesMale, images } from "@/lib/assets";
import {
  Heart,
  LogIn,
  LogOut,
  Search,
  ShoppingCart,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import MobileMenu from "./ui/MobileMenu";
import { useProductContext } from "@/Context/productContext";
import CategoryMenu from "./ui/CategoryMenu";
import { redirect, useRouter } from "next/navigation";
import { useUser } from "@/Context/userContext";


function Navbar() {
  const { menuHidden, setMenuHidden } = useProductContext();
  const router = useRouter();
  const {user, signOutUser, currnetUser, signout } = useUser();




  return (

    <div className="w-screen h-[70px] fixed top-0 z-50 bg-gradient-to-b from-black to-transparent flex justify-around items-center text-white">
      
      {/* Mobile Menu Section starts */}
      <button onClick={()=>setMenuHidden(!menuHidden)} className="flex md:hidden items-center justify-center text-xl z-50">
        <div className="flex flex-col gap-1.5 text-red-200">
          <div className={`w-7  h-[4px] origin-left custom-transition ${menuHidden ? 'rotate-0 bg-black':'rotate-45 bg-orange-400'}`}></div>
          <div className={`w-7 h-[4px] bg-black custom-transition ${menuHidden ? 'opacity-100': 'opacity-0'}`}></div>
          <div className={`w-7 h-[4px]  origin-left custom-transition ${menuHidden ? 'rotate-0 bg-black':'-rotate-45 bg-orange-400'}`}></div>
        </div>
      </button>
      <div className={`absolute top-0 w-screen h-screen flex custom-transition ${menuHidden ? '-translate-x-full' : 'translate-x-0'}`}>
        <div className="bg-white w-full">
          <MobileMenu/>
        </div>
      </div>

      {/* Mobile Menu Section ends */}

      {/* Navbar Menu Section starts */}

      <Link href={'/'} className="w-20 h-20 flex items-center z-50">
        <Image alt="logo" src={images.logowhite} width={100} />
      </Link>

      <ul className="flex gap-5 items-center h-full">
        <li className="hidden md:grid grid-cols-2 gap-5 h-full text-center">
          <div className="relative overflow-hidden group">
            <div className="w-full h-full text-center flex items-center justify-center">
              <Link href={'/shop/Male'}>MEN</Link>
            </div>
            <div className="absolute bottom-0 w-full h-[4px] bg-orange-500 custom-transition translate-y-full group-hover:translate-y-0"></div>
            <div className="fixed top-[70px] left-0 w-full hidden group-hover:block pb-5 border-b border-orange-400 bg-white">
              <CategoryMenu value={categoriesMale} gender="Male"/>
            </div>
          </div>
          <div className="relative overflow-hidden group">
            <div className="w-full h-full text-center flex items-center justify-center">
              <Link href={'/shop/Female'}>WOMEN</Link>
            </div>
            <div className="absolute bottom-0 w-full h-[4px] bg-orange-500 custom-transition translate-y-full group-hover:translate-y-0"></div>
            <div className="fixed top-[70px] left-0 w-full hidden group-hover:block pb-5 border-b border-orange-400 bg-white">
              <CategoryMenu value={categoriesFemale} gender="Female"/>
            </div>
          </div>
        </li>
        <li className="hidden md:flex gap-2 items-center">
          <input
            id="search"
            type="text"
            className="h-10 w-[250px] border-2 border-orange-400 rounded-full px-3 py-1"
          />
          <label htmlFor="search" className="cursor-pointer">
            <Search className="hover:fill-current" />
          </label>
        </li>

        <li onClick={()=>redirect('/user/wishlist')} className="cursor-pointer">
          <Heart className="hover:fill-current text-red-400"/>
        </li>
        <li onClick={()=>redirect('/user/cart')} className="cursor-pointer">
          <ShoppingCart className="hover:fill-current" />
        </li>
        <div className="hidden md:block group relative custor-pointer">
                    <User2 className={`hover:fill-current`}/>
                    <div className="absolute hidden group-hover:flex justify-center items-end top-[20px] w-[200px] h-[250px] ">
                      <div className="w-full h-[220px] bg-white flex flex-col gap-2 p-2 items-center justify-evenly">
                        <button onClick={()=>redirect('/user')} className=" border w-full h-full hover:bg-orange-100 custom-transition">
                          USER
                        </button>
                        <button onClick={()=>redirect('/orders')} className=" border w-full h-full hover:bg-orange-100 custom-transition">
                          MY ORDERS
                        </button>
                        <button onClick={()=>redirect('/user')} className=" border w-full h-full hover:bg-orange-100 custom-transition">
                          TRACK ORDER
                        </button>
                        <button  onClick={signout} className="flex justify-center items-center border w-full h-full hover:bg-red-200 custom-transition">
                          <LogOut/>
                          <p>LOGOUT</p>
                        </button>
                      </div>
                    </div>
                  </div>
                  <button className="hidden md:block" onClick={()=>redirect('/login')}>
                    <LogIn className="hover:fill-current"/>  
                  </button>
      </ul>
      {/* Navbar Menu Section ends */}

    </div>
  );
}

export default Navbar;