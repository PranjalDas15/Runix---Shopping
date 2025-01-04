"use client";

import Loading from "@/components/Loading";
import Shop from "@/components/shopComponents/Shop";
import { setCategoryValue, setGenderValue } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { Search } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import FilterSidebar from "@/components/shopComponents/FilterSidebar";

const page = () => {
  const dispatch = useAppDispatch();
  const searchParam = useSearchParams();
  const { products, genderValue, categoryValue, loading, error } =
    useAppSelector((state: RootState) => state.products);
  const [priceFilter, setPriceFilter] = useState<[number, number]>([
    500, 10000,
  ]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(setGenderValue(searchParam?.get("gender") ?? genderValue));
  }, [searchParam, genderValue, categoryValue]);

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
      {/* <div className="relative bg-white">
        <Carousel height="h-[400px] md:h-[800px]" label={advertisements} />
      </div> */}
      <div className="flex gap-2 py-5 px-2 mt-[70px]">
        <div className="w-[300px] md:relative min-h-screen border md:block custom-transition">
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
            setPriceFilter={setPriceFilter}
            priceFilter={priceFilter}
            setSearch={setSearch}
          />

          {/* <select
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value as "default" | "high-to-low" | "low-to-high" | "a-z" | "z-a")
            }
            className="border border-gray-300 rounded-md px-3 py-1 text-sm"
          >
            <option value="default">Sort by</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="high-to-low">Price: Low to High</option>
            <option value="high-to-low">Price: High to Low</option>
            <option value="high-to-low">Price: High to Low</option>
          </select> */}

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
        <div className="">
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
          {filteredProducts.length > 0 ? (
            <Shop value={filteredProducts} heartButton={true} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default page;
