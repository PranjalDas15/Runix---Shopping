"use client";

import { advertisements, advertisements2 } from "@/lib/assets";
import Hero from "@/components/homeComponents/Hero";
import Brand from "@/components/homeComponents/Brand";
import Carousel from "@/components/homeComponents/Carousel";
import CategoriesMale from "@/components/homeComponents/CategoriesMale";
import CategoriesFemale from "@/components/homeComponents/CategoriesFemale";
import NewArrivals from "@/components/homeComponents/NewArrivals";
import { ArrowBigUp } from "lucide-react";
import Footer from "@/components/Footer";

export default function Home() {

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
        <Footer/>
        {/* <NewArrivals /> */}
      </div>
    </>
  );
}
