"use client";

import Loading from "@/components/Loading";
import Shop from "@/components/shopComponents/Shop";
import { setGenderValue } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Filter, Search, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import FilterSidebar from "@/components/shopComponents/FilterSidebar";

function ShoppingPage () {
  const searchParam = useSearchParams();
  const dispatch = useAppDispatch();

  const { products, genderValue, categoryValue, loading, error } =
    useAppSelector((state: RootState) => state.products);
  const [search, setSearch] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => { 
    const genderParam = searchParam?.get('gender') || '';
    if(genderValue !== genderParam) 
      dispatch(setGenderValue(genderParam));
  }, [dispatch, genderValue, searchParam]);

  const [sortOption, setSortOption] = useState<
    "default" | "high-to-low" | "low-to-high" | "a-z" | "z-a"
  >("default");

  const filteredProducts = products
    .filter(
      (product) =>
        (search === "" ||
          product.productName.toLowerCase().includes(search.toLowerCase())) &&
        (genderValue === "" ||
          product.gender.toLowerCase() === genderValue.toLowerCase()) &&
        (categoryValue === "" ||
          product.category.toLowerCase() === categoryValue.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "high-to-low") {
        return b.price - a.price;
      }
      if (sortOption === "low-to-high") {
        return a.price - b.price;
      }
      if (sortOption === "a-z") {
        return a.productName.localeCompare(b.productName);
      }
      if (sortOption === "z-a") {
        return b.productName.localeCompare(a.productName);
      }
      return 0;
    });

  if (loading) {
    return (
      <>
        <Loading />
      </>
    );
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div>
        <div className="relative flex gap-2 py-5 px-2 pt-[70px] w-full h-screen">
          <div
            className="absolute top-[65px] md:hidden mt-5"
            onClick={() => setIsHidden(!isHidden)}
          >
            <Filter />
          </div>

          <div
            className={`absolute top-0 z-20 bg-white w-full md:w-[300px] max-h-full md:relative min-h-screen border md:block custom-transition pt-[70px] md:pt-0 ${
              isHidden
                ? "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100"
                : "translate-x-0 opacity-100"
            }`}
          >
            <div
              className="w-full flex justify-end p-3 md:hidden"
              onClick={() => setIsHidden(!isHidden)}
            >
              <X />
            </div>
            <div className="relative mx-2 my-5">
              <input
                type="text"
                placeholder="Search Products"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-md"
              />
              <div className="absolute top-0 p-2">
                <Search className="text-orange-400" />
              </div>
            </div>

            <FilterSidebar
            />

            <div className="mx-2 my-5">
              <h1 className="text-black text-lg md:text-xl font-bold mt-4">
                Sort By
              </h1>
              <select
                name="sort"
                id="sort"
                className="py-4 px-4 border mt-2 rounded-md w-full selection:font-bold focus:ring-orange-500 "
                value={sortOption}
                onChange={(e) =>
                  setSortOption(
                    e.target.value as
                      | "default"
                      | "high-to-low"
                      | "low-to-high"
                      | "a-z"
                      | "z-a"
                  )
                }
              >
                <option value="relavance">Relevance</option>
                <option
                  disabled
                  className="text-gray-600 font-semibold bg-slate-200"
                >
                  Price
                </option>
                <option
                  value="low-to-high"
                  onChange={() =>
                    filteredProducts.sort((a, b) => a.price - b.price)
                  }
                >
                  Low to High
                </option>
                <option value="high-to-low">High to Low</option>
                <option
                  disabled
                  className="text-gray-600 font-semibold bg-slate-200"
                >
                  Name
                </option>
                <option value="a-z">Accending Order</option>
                <option value="z-a">Descending Order</option>
              </select>
            </div>
          </div>
          <div className="mt-14 md:mt-0 flex flex-col w-full">
            <div className="pb-5 text-2xl font-bold ">
              <h1 className="">
                {genderValue === ""
                  ? "Shop"
                  : genderValue === "female"
                  ? "Female"
                  : "Male"}
              </h1>
              <p className="text-sm font-light text-gray-500">
                {categoryValue === ""
                  ? "All"
                  : categoryValue.charAt(0).toUpperCase() +
                    categoryValue.slice(1)}
              </p>
            </div>
            <div className="max-h-screen w-full overflow-auto pb-5">
              {filteredProducts.length > 0 ? (
                <Shop value={filteredProducts} heartButton={true} />
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
    </div>
  );
};

export default function page () {
  return(
    <Suspense fallback={<Loading/>}>
      <ShoppingPage />
    </Suspense>
  )
}

