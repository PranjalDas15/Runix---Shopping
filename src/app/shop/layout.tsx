"use client";

import Carousel from "@/components/homeComponents/Carousel";
import Loading from "@/components/Loading";
import Sidebar from "@/components/shopComponents/Sidebar";
import { useProductContext } from "@/Context/productContext";
import { advertisements, advertisements2 } from "@/lib/assets";
import { Filter } from "lucide-react";
import { ReactNode, useState } from "react";

export default function ShopLayout({ children }: { children: ReactNode }) {
  const { loading } = useProductContext();
  const [isHidden, setisHidden] = useState<boolean>(true);
  const { genderValue } = useProductContext();

  return (
    <>
      {loading ? <Loading/> :
      <div className="relative min-h-screen bg-white">
      {genderValue === "Female" && <Carousel label={advertisements} height={'h-[400px] md:h-[800px]'} />}
      {genderValue === "Male" && <Carousel label={advertisements2}  height={'h-[400px] md:h-[800px]'}/>}

      <button
        className="flex md:hidden justify-evenly gap-2 items-center mx-5 my-4 py-2 px-3 border"
        onClick={() => setisHidden(!isHidden)}
      >
        <Filter className="text-orange-400" />
        <p>Filter</p>
      </button>
      <div className="flex gap-2 py-5 px-2">
        <div
          className={`w-[300px] absolute md:relative min-h-screen border md:block custom-transition z-50 ${
            isHidden
              ? "-translate-x-full md:translate-x-0 opacity-0 md:opacity-100 md:z-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          <Sidebar />
        </div>

        <div className="h-screen w-full overflow-x-auto scroll-smooth">
          {children}
        </div>
      </div>
    </div>}
    </>
  );
}
