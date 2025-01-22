"use client";

import { useAppSelector } from "@/lib/hooks";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = () => {
  const { user } = useAppSelector((state) => state.user);
  const { products } = useAppSelector((state) => state.products);

  const sellerProducts = products.filter((p) => p.seller._id === user?._id);
  return (
    <div className="w-full h-screen overflow-y-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 py-3 px-2">
        {sellerProducts.length > 0 ? (
          sellerProducts.map((product, index) => {
            return (
              <div
                key={index}
                className="flex rounded-xl border overflow-hidden h-40"
              >
                {product.productImage.length > 0 ? (
                  
                    <div
                      key={index}
                      className="w-48 h-full overflow-hidden"
                    >
                      <Image
                        width={200}
                        height={200}
                        alt=""
                        src={product.productImage[0]}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                ) : (
                  <div></div>
                )}
                <div className="w-full grid grid-cols-1 px-2 py-3">
                  <div className="col-span-3 flex flex-col gap-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <p className="text-xl md:text-2xl text-gray-600">
                          {product.productBrand}
                        </p>
                        <p className="bg-orange-400 text-white text-[10px] px-1 rounded-full">
                          {product.category}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <p className="text-gray-500 text-sm">
                          {product.gender}
                        </p>
                        <p className="text-[12px] text-white bg-orange-400 px-1 font-semibold">
                          {product.size}
                        </p>
                        <p className="text-gray-600">x{product.quantity}</p>
                      </div>
                    </div>

                    <p className="text-orange-400 text-sm md:text-base">
                      {product.productName}
                    </p>
                    <p className="text-[12px] xl:text-base text-gray-400">
                      {product.productDesc.slice(0, 110)}{" "}
                      {product.productDesc.length >= 110 && "..."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold text-orange-500">
                      ₹{product.price}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {product.discountPercent}% OFF
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>No Products found.</div>
        )}
      </div>
    </div>
  );
};

export default page;
