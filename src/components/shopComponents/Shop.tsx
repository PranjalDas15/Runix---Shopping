"use client";

import { Heart, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  addToWishlist,
  deleteFromWishlist,
} from "@/lib/actions/wishlistActions";
import { useAppDispatch } from "@/lib/hooks";
import { addToCart } from "@/lib/actions/cartActions";


interface Prop {
  value: any;
  delButton?: true;
  heartButton?: true;
}

const Shop: React.FC<Prop> = ({ value, delButton, heartButton }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const discountedPrice = (price: number, discountPercent: number) => {
    const discountAmount = (price * discountPercent) / 100;
    return price - discountAmount;
  };

  const isProductQuantityLow = (quantity: number) => {
    if (quantity <= 10) {
      return true;
    }
  };

  return (
    <div>
      <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 w-full h-full">
        {value.map((product: any, index: number) => (
          <div key={index} className="w-full border h-[350px] relative group">
            {product.productImage && product.productImage[0] && (
              <div className="w-full h-[200px] overflow-hidden">
                <Image
                  alt={product.productName || "Product Image"}
                  src={product.productImage[0]}
                  width={200}
                  height={200}
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
              </div>
              <p
                className={`text-[10px] py-1 md:py-0 md:text-[12px] text-red-500 ${
                  isProductQuantityLow(product.quantity) ? "" : "hidden"
                }`}
              >
                Only few left
              </p>
              <p className="text-wrap font-semibold text-sm md:text-base">
                {product.productName}
              </p>
              <p className="text-[12px] md:text-sm text-gray-500">
                {product.productDesc}
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
              onClick={() => router.push(`/product/${product._id}`)}
              className="w-full h-full absolute top-0 flex items-center justify-center flex-col custom-transition opacity-0 group-hover:opacity-100 bg-[rgba(0,0,0,0.4)] backdrop-blur-sm"
            >
              <div className="flex justify-evenly gap-4 text-white">
                {heartButton ? (
                  <div
                    onClick={(e) => {
                      dispatch(addToWishlist(product._id));
                      e.stopPropagation();
                    }}
                  >
                    <Heart className="hover:fill-current custom-transition" />
                  </div>
                ) : null}
                <div
                  onClick={(e) => {
                    dispatch(addToCart({productId: product._id, productQuantity: 1}));
                    e.stopPropagation();
                  }}
                >
                  <ShoppingCart className="hover:fill-current custom-transition" />
                </div>
                {delButton ? (
                  <div
                    onClick={(e) => {
                      dispatch(deleteFromWishlist(product._id));
                      e.stopPropagation();
                    }}
                  >
                    <X className="hover:text-orange-400 custom-transition" />
                  </div>
                ) : null}
              </div>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shop;
