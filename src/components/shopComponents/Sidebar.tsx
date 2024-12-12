"use client";

import { categories, genders } from "@/lib/assets";
import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import { useProductContext } from "@/Context/productContext";
import { usePathname, useRouter } from "next/navigation";

const Sidebar = () => {

  const { categoryValue, setCategoryValue, genderValue, setGenderValue, setLoading } = useProductContext();
  const router = useRouter();
  const pathname = usePathname();

  const handleGenderChange = (gender: string) => {
    setGenderValue(gender);
    router.push(`/shop/${gender}`); 
  };

  const handleCategoryChange = (category: string) => {
    setGenderValue(category);

    if(category === "All") {
      router.push(`/shop/${genderValue}`); 
    } else {
      router.push(`/shop/${genderValue}/${category}`); 
    }

  };

  useEffect(() => {
    if (pathname) {  
      const parts = pathname.split('/');
      const genderFromUrl = parts[2]; 
      const categoryFromUrl = parts[3];
      
      if (genderFromUrl && genderValue !==   genderFromUrl) {
        
        setLoading(true)
        setGenderValue(genderFromUrl);
        window.scrollTo({
          top:0,
          behavior: "smooth"
        });

        setLoading(false)
      }

      if (categoryFromUrl && categoryValue !== categoryFromUrl) {
        setCategoryValue(categoryFromUrl);
      } else if (!categoryFromUrl && categoryValue !== "All") {
        setCategoryValue("All"); 
      }
    }
  }, [pathname, genderValue, setGenderValue, setCategoryValue, categoryValue  ]);

  return (
    <div className="p-3 bg-white min-h-screen">
      <h1 className="text-xl text-center font-semibold">Filter</h1>
      <div className="p-3 my-2 border">
        <h2 className="font-semibold text-lg">By Price</h2>
        <Slider min={500} step={500} max={10000} />
      </div>
      <div className="flex flex-col gap-2 border mb-2 p-3">
        <h2 className="font-semibold text-lg">By Gender</h2>
        {genders.map((gender, index) => (
          <div key={index} className="py-1 px-2 grid-cols-2 md:grid-cols-1">
            <input
              id={gender.gender}
              type="radio"
              name="gender"
              value={gender.gender}
              checked={genderValue === gender.gender}
            
              onChange={(e) => handleGenderChange(gender.gender)} 
              className="hidden peer"
            />
            <label
              htmlFor={gender.gender}
              className="flex items-center justify-evenly w-4 h-4 border border-gray-400 rounded-full peer-checked:border-orange-500 peer-checked:bg-orange-500 cursor-pointer"
            >
              <div>
                <span className="hidden w-3 h-3 bg-white rounded-full peer-checked:block"></span>
              </div>
            
              <span className="ml-6 text-gray-700 text-wrap">{gender.gender}</span>
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2 border p-3">
        <h2 className="font-semibold text-lg">By Category</h2>
        {categories.map((category, index) => (
          <div key={index} className="py-1 px-2 flex">
            <input
              id={category.type}
              type="radio"
              name="category"
              value={category.type}
              checked={categoryValue === category.type}
              onChange={(e) => handleCategoryChange(category.type)}
              className="hidden peer"
            />
            <label
              htmlFor={category.type}
              className="flex items-center justify-evenly w-4 h-4 border border-gray-400 rounded-full peer-checked:border-orange-500 peer-checked:bg-orange-500 cursor-pointer"
            >
              <div>
                <span className="hidden w-3 h-3 bg-white rounded-full peer-checked:block"></span>
              </div>
            
              <span className="ml-6 text-gray-700 text-wrap">{category.type}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
