'use client'

import Loading from "@/components/Loading";
import FilterSidebar from "@/components/shopComponents/FilterSidebar";
import { setCategoryValue, setGenderValue, setSearchValue } from "@/lib/features/productSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { discountedPrice } from "@/lib/utils/utils";
import { Product } from "@/types/Product";
import { Filter, Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { createContext, ReactNode, Suspense, useContext, useEffect, useState } from "react";
import { fetchProducts } from "@/lib/actions/fetchProducts";

interface ShopContextType {
  totalPages: number;
  itemsPerPage: number;
  currentPage: number | null;
  setCurrentPage: React.Dispatch<React.SetStateAction<number | null>>;
  filteredProducts: Product[];
}

const ShopContext = createContext<ShopContextType>({
  totalPages: 0,
  itemsPerPage: 30,
  currentPage: 1,
  setCurrentPage: () => {},
  filteredProducts: [],
});

const Layout = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const { genderValue, categoryValue, searchValue, loading, error } =
    useAppSelector((state: RootState) => state.products);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchAndSetProducts = async () => {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    };
    fetchAndSetProducts();
  }, []);

  const [currentPage, setCurrentPage] = useState<number | null>(searchParams ? Number(searchParams) : null);
  const [sortOption, setSortOption] = useState<"default" | "high-to-low" | "low-to-high" | "a-z" | "z-a">("default");
  const [isHidden, setIsHidden] = useState(true);

  const filteredProducts = products
    .filter((product) => {
      const matchesGender =
        genderValue === "" || product.gender.toLowerCase() === genderValue.toLowerCase();

      const matchesCategory =
        categoryValue === "" || product.category.toLowerCase() === categoryValue.toLowerCase();

      const matchesSearch =
        searchValue === "" ||
        searchValue
          .toLowerCase()
          .split(" ")
          .every((word) => {
            return (
              product.productName.toLowerCase().includes(word) ||
              product.productBrand.toLowerCase().includes(word) ||
              product.category.toLowerCase().includes(word)
            );
          });

      return matchesGender && matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      if (sortOption === "high-to-low") {
        return discountedPrice(b.price, b.discountPercent) - discountedPrice(a.price, a.discountPercent);
      }
      if (sortOption === "low-to-high") {
        return discountedPrice(a.price, a.discountPercent) - discountedPrice(b.price, b.discountPercent);
      }
      if (sortOption === "a-z") {
        return a.productName.localeCompare(b.productName);
      }
      if (sortOption === "z-a") {
        return b.productName.localeCompare(a.productName);
      }
      return 0;
    });

  const itemsPerPage = 30;
  const length = filteredProducts?.length || 0;
  const totalPages = Math.ceil(length / itemsPerPage);

  useEffect(() => {
    if (totalPages !== 0) {
      const pageParam = searchParams?.get("page");
      if (
        Number(pageParam) > totalPages ||
        Number(pageParam) < 0 ||
        Number(pageParam) === 0 ||
        isNaN(Number(pageParam))
      ) {
        const queryParam = new URLSearchParams(searchParams?.toString());
        queryParam.set("page", "1");
        router.push(`?${queryParam.toString()}`);
      }
    }
    const genderParam = searchParams?.get("gender") || "";
    if (genderValue !== genderParam) dispatch(setGenderValue(genderParam));

    const categoryParam = searchParams?.get("category") || "";
    if (categoryValue !== categoryParam) dispatch(setCategoryValue(categoryParam));

    const searchParam = searchParams?.get("search") || "";
    if (searchValue !== searchParam) dispatch(setSearchValue(searchParam));
  }, [dispatch, genderValue, searchParams, totalPages, searchValue, categoryValue]);

  const handleSearchChange = (value: string) => {
    dispatch(setSearchValue(value));
    const queryParam = new URLSearchParams(searchParams?.toString());
    if (value) {
      queryParam.set("search", value);
    } else {
      queryParam.delete("search");
    }
    router.push(`?${queryParam.toString()}`);
  };

  return (
    <div className="relative flex gap-2 py-5 px-2 pt-[70px] w-full h-screen">
      <div
        className="absolute top-[65px] md:hidden mt-5"
        onClick={() => setIsHidden(!isHidden)}
      >
        <Filter />
      </div>

      <div
        className={`absolute top-0 z-20 bg-white w-full md:w-[300px] max-h-full md:relative min-h-screen border md:block custom-transition md:pt-0 ${
          isHidden
            ? "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100"
            : "translate-x-0 opacity-100"
        }`}
      >
        <div
          className="w-full flex justify-end p-3 md:hidden pt-[70px]"
          onClick={() => setIsHidden(!isHidden)}
        >
          <X />
        </div>
        <div className="relative mx-2 my-5">
          <input
            type="text"
            placeholder="Search Products"
            value={searchValue}
            onChange={(e) => {
              handleSearchChange(e.target.value);
            }}
            className="w-full pl-10 pr-2 py-2 border border-gray-300 rounded-md"
          />
          <div className="absolute top-0 p-2">
            <Search className="text-orange-400" />
          </div>
        </div>

        <FilterSidebar />

        <div className="mx-2 my-5">
          <h1 className="text-black text-lg md:text-xl font-bold mt-4">Sort By</h1>
          <select
            name="sort"
            id="sort"
            className="py-4 px-4 border mt-2 rounded-md w-full selection:font-bold focus:ring-orange-500"
            value={sortOption}
            onChange={(e) =>
              setSortOption(
                e.target.value as "default" | "high-to-low" | "low-to-high" | "a-z" | "z-a"
              )
            }
          >
            <option value="relavance">Relevance</option>
            <option disabled className="text-gray-600 font-semibold bg-slate-200">
              Price
            </option>
            <option value="low-to-high">Low to High</option>
            <option value="high-to-low">High to Low</option>
            <option disabled className="text-gray-600 font-semibold bg-slate-200">
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
            {searchValue ? searchValue : categoryValue === ""
              ? "All"
              : categoryValue.charAt(0).toUpperCase() + categoryValue.slice(1)}
          </p>
        </div>
        <div className="max-h-screen w-full pb-5">
          {loading ? <Loading /> : (
            <ShopContext.Provider
              value={{
                totalPages,
                currentPage,
                setCurrentPage,
                itemsPerPage,
                filteredProducts,
              }}
            >
              {children}
            </ShopContext.Provider>
          )}
        </div>
      </div>
    </div>
  );
};

export function useShopContext(): ShopContextType {
  return useContext(ShopContext);
}

export default Layout;
