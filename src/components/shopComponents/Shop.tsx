"use client";

import { Heart, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  discountedPrice,
  handleAddtoCart,
  handleAddtoWishlist,
  handleRemoveFromWishlist,
} from "@/lib/utils/utils";
import { RootState } from "@/lib/store";
import toast from "react-hot-toast";

interface Prop {
  value: any;
  delButton?: true;
  heartButton?: true;
}

const Shop: React.FC<Prop> = ({ value, delButton, heartButton }) => {
  
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.user);

  const isProductQuantityLow = (quantity: number) => {
    if (quantity <= 10) {
      return true;
    }
  };
  return (
    <div>
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 w-full h-full">
        {value.map((product: any, index: number) => {
          const alreadyAddedtoWishlist = user?.wishlist?.some(
            (p) => p._id === product?._id
          );
          const alreadyAddedtoCart = user?.cart?.some(
            (p) => p.product?._id === product._id
          );

          return (
            <div key={index} className="w-full border h-[350px] relative group">
              {product.productImage && product.productImage[0] && (
                <div className="w-full h-[200px] overflow-hidden">
                  <Image
                    alt={product.productName || "Product Image"}
                    src={product.productImage[0]}
                    width={500}
                    height={500}
                    className="object-cover w-full h-full group-hover:scale-125 custom-transition"
                  />
                </div>
              )}
              <div className="px-2">
                <div className="text-[10px] md:text-[12px] py-2">
                  <span className="border rounded-full px-2 py-1">
                    {product.gender}
                  </span>
                  <span className="border rounded-full mx-2 px-2 py-1">
                    {product.category}
                  </span>
                  <span className="border rounded-full px-2 py-1">
                    {product.size}
                  </span>
                </div>
                <p
                  className={`text-[10px] py-1 md:py-0 md:text-[12px] text-red-500 ${
                    isProductQuantityLow(product.quantity) ? "" : "hidden"
                  }`}
                >
                  Only few left
                </p>
                <p className="text-wrap font-semibold text-sm md:text-base">
                  {product.productBrand}
                </p>
                <p className="text-[12px] md:text-sm text-gray-500">
                  {product.productName}
                </p>
                <div className="flex gap-2 text-sm md:text-base">
                  <p className="text-gray-500 line-through">₹{product.price}</p>
                  <p className="font-semibold">
                    ₹{discountedPrice(product.price, product.discountPercent)}
                  </p>
                  <p className="text-orange-400">
                    {product.discountPercent}% OFF
                  </p>
                </div>
              </div>

              {/* Hover Face */}

              <button
                onClick={() => {
                  const brand = product.productBrand.replace(/\s+/g, "");
                  const name = product.productName.replace(/\s+/g, "");
                  router.push(`/product/${brand+name + product.size}`);
                }}
                className="w-full h-full absolute top-0 flex items-center justify-center flex-col custom-transition opacity-0 group-hover:opacity-100 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
              >
                <div className="flex justify-evenly gap-4 text-white">
                  {heartButton ? (
                    <div
                      onClick={(e) => {
                        if (alreadyAddedtoWishlist) {
                          toast.error("Already added to Wishlist");
                          e.stopPropagation();
                        } else {
                          handleAddtoWishlist(product._id, dispatch);
                          e.stopPropagation();
                        }
                      }}
                    >
                      <Heart
                        className={`hover:fill-current custom-transition ${
                          alreadyAddedtoWishlist ? "fill-current" : "fill-none"
                        }`}
                      />
                    </div>
                  ) : null}
                  <div
                    onClick={(e) => {
                      if (alreadyAddedtoCart) {
                        toast.error("Already added to Cart");
                        e.stopPropagation();
                      } else {
                        handleAddtoCart(product._id, 1, dispatch);
                        e.stopPropagation();
                      }
                    }}
                  >
                    <ShoppingCart
                      className={`hover:fill-current custom-transition ${
                        alreadyAddedtoCart ? "fill-current" : "fill-none"
                      }`}
                    />
                  </div>
                  {delButton ? (
                    <div
                      onClick={(e) => {
                        handleRemoveFromWishlist(product._id, dispatch);
                        e.stopPropagation();
                      }}
                    >
                      <X className="hover:text-orange-400 custom-transition" />
                    </div>
                  ) : null}
                </div>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
