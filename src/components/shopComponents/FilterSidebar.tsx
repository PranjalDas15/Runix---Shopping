'use client';

import React, { useState } from 'react'
import Arrow from '../ui/Arrow';
import { categories, genders } from '@/lib/assets';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { setCategoryValue, setGenderValue } from '@/lib/features/productSlice';



const FilterSidebar = () => {
  const dispatch = useAppDispatch();
  const { genderValue, categoryValue } = useAppSelector((state) => state.products);
  const [ priceValue, setPriceValue ] = useState<number>(0);
  const router = useRouter();
  const [openSection, setOpenSection] = useState<string | null>(null);
  const searchParams = useSearchParams();

  
  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  }


  return (
    <>
      <div className="px-2 flex flex-col gap-4">
            <div className="text-gray-500">
              <h1 className="text-black text-lg md:text-xl font-bold mt-4">
                Filter
              </h1>

              <div className="border rounded-lg px-4 pt-4 mt-2">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("gender")}
                >
                  <h2 className="text-black font-semibold">By Gender</h2>
                  <div
                    className={`custom-transition ${
                      openSection === "gender" ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <Arrow />
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-2 mt-2 custom-transition overflow-hidden ${
                    openSection === "gender" ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  {genders.map((gender, index) => (
                    <div
                      key={index}
                      className={`custom-transition ${
                        openSection === "gender"
                          ? "translate-y-0 opacity-100"
                          : "translate-y-[100px] opacity-0"
                      }`}
                    >
                      <input
                        id={gender.gender}
                        name="gender"
                        type="radio"
                        value={gender.value}
                        checked={genderValue.toLowerCase() === gender.value.toLowerCase()}
                        onChange={(e: any) => {
                          const selectedGender = e.target.value;
                          const params = new URLSearchParams(searchParams?.toString());
                          if (e.target.value === "") {
                            dispatch(setGenderValue(""))
                            params.delete("gender");
                            router.push(`?${params.toString()}`);
                          } else {
                            dispatch(setGenderValue(selectedGender));
                            
                            params.set("gender", selectedGender)
                            params.set("page", "1");
                            router.push(`?${params.toString()}`);
                          }
                        }}
                        className="peer hidden"
                      />

                      <label
                        htmlFor={gender.gender}
                        className="flex items-center justify-evenly w-4 h-4 border border-gray-400 rounded-full peer-checked:border-orange-500 peer-checked:bg-orange-500 cursor-pointer"
                      >
                        <div>
                          <span className="hidden w-3 h-3 bg-white rounded-full peer-checked:block"></span>
                        </div>

                        <span className="ml-6 text-gray-700 text-wrap">
                          {gender.gender}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-2"></div>
              </div>

              <div className="border rounded-lg px-4 pt-4 pb-2 mt-2">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleSection("category")}
                >
                  <h2 className="text-black font-semibold">By Category</h2>
                  <div
                    className={`custom-transition ${
                      openSection === "category" ? "rotate-0" : "rotate-180"
                    }`}
                  >
                    <Arrow />
                  </div>
                </div>
                <div
                  className={`flex flex-col gap-2 mt-2 custom-transition overflow-hidden ${
                    openSection === "category" ? "max-h-[300px]" : "max-h-0"
                  }`}
                >
                  {categories.map((category, index) => (
                    <div
                      key={index}
                      className={`custom-transition ${
                        openSection === "category"
                          ? "translate-y-0 opacity-100"
                          : "translate-y-[100px] opacity-0"
                      }`}
                    >
                      <input
                        id={category.type.toLowerCase()}
                        name="category"
                        type="radio"
                        value={category.value}
                        checked={
                          categoryValue.toLowerCase() ===
                          category.value.toLowerCase()
                        }
                        onChange={(e: any) => {
                          const selectedCategory = e.target.value;
                          const params = new URLSearchParams(searchParams?.toString());
                          if(e.target.value === ""){
                            dispatch(setCategoryValue(""));
                            params.delete("category");
                            router.push(`?${params.toString()}`);
                          } else {
                            dispatch(setCategoryValue(selectedCategory.toLowerCase()))
                            params.set("category", selectedCategory);
                            params.set("page", "1");
                            router.push(`?${params.toString()}`)
                          }
                          
                        }}
                        className="peer hidden"
                      />

                      <label
                        htmlFor={category.type.toLowerCase()}
                        className="flex items-center justify-evenly w-4 h-4 border border-gray-400 rounded-full peer-checked:border-orange-500 peer-checked:bg-orange-500 cursor-pointer"
                      >
                        <div>
                          <span className="hidden w-3 h-3 bg-white rounded-full peer-checked:block"></span>
                        </div>

                        <span className="ml-6 text-gray-700 text-wrap">
                          {category.type}
                        </span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
    </>
  )
}

export default FilterSidebar