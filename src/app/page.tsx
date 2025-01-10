"use client";

import { advertisements, advertisements2 } from "@/lib/assets";
import Hero from "@/components/homeComponents/Hero";
import Brand from "@/components/homeComponents/Brand";
import Carousel from "@/components/homeComponents/Carousel";
import CategoriesMale from "@/components/homeComponents/CategoriesMale";
import CategoriesFemale from "@/components/homeComponents/CategoriesFemale";
import NewArrivals from "@/components/homeComponents/NewArrivals";
import { ArrowBigUp } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [isTop, setIsTop] = useState(true);
  const autoAppear = () => {
    if (window.scrollY > 1) {
      setIsTop(false);
    } else {
      setIsTop(true);
    }
  };

  window.addEventListener("scroll", autoAppear);

  const handleScroll = () => {
    window.scrollTo(0, 0);
  }

  return (
    <>
      <div className="relative w-full h-[100vh] overflow-y-auto snap-y snap-mandatory">
        <Brand />
        <Carousel
          label={advertisements2}
          height={"h-[100vh]"}
          extras={"snap-center"}
        />
        <Hero />
        <CategoriesMale /> 
        <CategoriesFemale />
        <NewArrivals />
        <div
          className={`sticky bottom-10 mx-10 z-50 flex justify-end custom-transition ${
            isTop ? "translate-y-full opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          <button  onClick={()=>handleScroll} className={`px-2 py-2 flex justify-center items-center bg-orange-200`}>
            <ArrowBigUp/>
          </button>
        </div>
      </div>
    </>
  );
}
