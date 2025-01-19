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
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useEffect } from "react";
import { redirect, useRouter } from "next/navigation";

export default function Home() {
  const {user} = useAppSelector((state)=>state.user);
  const router = useRouter()
  const dispatch = useAppDispatch();
  useEffect(()=>{
    if(user?.role === 'Seller'){
      redirect('/admin')
    }
    console.log("ROle: ",user?.role)
  },[dispatch, user])

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
