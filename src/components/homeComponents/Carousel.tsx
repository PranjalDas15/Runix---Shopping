"use client";

import { banners } from "@/lib/assets";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Button from "../ui/Button";
import { Circle, MoveLeft, MoveRight } from "lucide-react";

type Label = {
  label: any,
  height: string,
  extras?: any
}

const Carousel: React.FC<Label> = ({ label, height, extras }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const length = banners.length;

  const handlePrevious = () => {
    const newIndex = currentIndex - 1;
    setCurrentIndex(newIndex < 0 ? length - 1 : newIndex);
  };

  const handleNext = () => {
    const newIndex = currentIndex + 1;
    setCurrentIndex(newIndex >= length ? 0 : newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex]);

  return (
    <div className={`relative w-full h-full overflow-hidden ${extras}`}>
      {/* Slider */}
      <div
        className="flex snap-x snap-mandatory transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {label.map((banner: any, index: any) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 snap-center relative overflow-x-auto"
          >
            <div className={`${height} w-full`}>
              <Image
                alt=""
                src={banner.image}
                width={900} height={900}
                className="object-cover w-full h-full"
              />
            </div>

            <div className="absolute flex flex-col gap-4 top-0 justify-center left-0 w-full h-full bg-[rgba(0,0,0,0.1)] p-20 z-40">
              <p className="font-extrabold text-[25px] md:text-[50px] text-white drop-shadow md:pt-[10%]">
                {banner.heading}
              </p>
              <p className="font-semibold text-[12px] md:text-[30px] text-white drop-shadow">
                {banner.body}
              </p>
              <div className="z-50">
              <Button
                  extras={''}
                >
                  {banner.button}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Slider ends */}

      {/* Navigation Buttons */}
      <button
        onClick={handlePrevious}
        className="absolute top-1/2 left-0 p-2 bg-transparent rounded-full text-white hover:bg-orange-400 custom-transition mx-5"
      >
        <MoveLeft className="" />
      </button>
      <button
        onClick={handleNext}
        className="absolute top-1/2 right-0 p-2 bg-transparent rounded-full text-white hover:bg-orange-400 custom-transition mx-5"
      >
        <MoveRight className="" />
      </button>

      {/* Navigation Buttons ends */}
      <div className="absolute bottom-0 w-full py-5 text-white flex justify-center items-center gap-3">
        {banners.map((_, index) => (
          <div key={index}>
            <Circle
              width={10}
              className={`cursor-pointer custom-transition fill-current ${index === currentIndex ? 'text-orange-400' : 'text-white hover:scale-125'}`}
              onClick={() => setCurrentIndex(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
