"use client";

import Image from "next/image";
import Navbar from "../components/Navbar";
import { useState } from "react";
import Loading from "../components/Loading";
import Button from "@/components/ui/Button";
import { advertisements, banners } from "@/lib/assets";
import Hero from "@/components/homeComponents/Hero";
import Brand from "@/components/homeComponents/Brand";
import Carousel from "@/components/homeComponents/Carousel";
import CategoriesMale from "@/components/homeComponents/CategoriesMale";
import CategoriesFemale from "@/components/homeComponents/CategoriesFemale";
import { useProductContext } from "@/Context/productContext";

export default function Home() {
  const {loading, products } = useProductContext();
  return <>
            {loading ? 
                <Loading/>
              : 
                <div className="relative w-full h-[100vh] overflow-y-auto snap-y snap-mandatory">
                  <Brand/>
                  <Carousel label={advertisements} height={'h-[100vh]'} extras={'snap-center'}/>
                  <Hero/>
                  {/* <p className="hidden">{products.length}</p> */}
                  {/* <Hero/> */}
                  {/* <Carousel label={banners}/> */}
                  <CategoriesMale/>
                  <CategoriesFemale/>
                </div>
            }
  
        </>;
}
