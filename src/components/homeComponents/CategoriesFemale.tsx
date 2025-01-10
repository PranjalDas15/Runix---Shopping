import { categoriesFemale } from "@/lib/assets";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

const Categories = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear1");
        } else {
          entry.target.classList.remove("appear1");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".dissapear1");
    hiddenElements.forEach((el) => observer.observe(el));

    return hiddenElements.forEach((el) => observer.observe(el));
  }, []);

  useEffect(() => {
    const observer2 = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("appear2");
        } else {
          entry.target.classList.remove("appear2");
        }
      });
    });

    const hiddenElements = document.querySelectorAll(".dissapear2");
    hiddenElements.forEach((el) => observer2.observe(el));

    return hiddenElements.forEach((el) => observer2.observe(el));
  }, []);
  return (
    <div className='relative flex flex-col justify-between items-center w-full h-[100vh] snap-center bg-fixed bg-[url("/banner3.jpg")] bg-cover bg-no-repeat bg-center'>
      <div className="w-full lg:h-full pt-36 px-4 text-white flex flex-col justify-end">
        <h1 className="text-[60px] md:text-[100px] font-bold dissapear1">FOR HER</h1>
        <Link
          href={`/shop/Female`}
          className="font-semibold text-xl flex gap-2 items-center dissapear1 px-2"
        >
          <p className="hover:text-orange-400 custom-transition">Shop</p>
          <ArrowRight size={20} />
        </Link>
      </div>
      <div className="w-full h-full overflow-hidden flex flex-col justify-end bg-gradient-to-t from-[rgba(0,0,0,0.5)] to-transparent pb-5 md:pb-10">
        <h1 className="text-white font-bold text-[40px] dissapear1 px-4 py-4">
          Shop by Category
        </h1>
        <div className="relative grid grid-cols-2 md:grid-cols-4 xl:grid-cols-7 gap-4 px-4 w-full ">
          {categoriesFemale.map((c, index) => (
            <Link
              href={`/shop/Female/${c.type}`}
              key={index}
              className="dissapear2 relative group rounded-xl h-[5.5rem] md:h-[8rem] overflow-hidden"
            >
              <div className='w-full h-full'>
                    <Image alt='' src={c.image} width={200} height={200} className='group-hover:scale-110 custom-transition w-full h-full object-cover' />
                  </div>
                  <div className='absolute top-0 w-full h-full custom-transition bg-[rgba(0,0,0,0.3)] group-hover:bg-[rgba(230,162,67,0.3)] text-[1.5rem] lg:text-[1.8rem] text-white items-center justify-center flex '>
                    <p>{c.type}</p>
                  </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
