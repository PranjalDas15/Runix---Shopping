"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import ConfirmOrder from "./ConfirmOrder";
import {
  discountedPrice,
  handleAddtoCart,
  handleRemoveFromCart,
} from "@/lib/utils/utils";
import { setSelectedProducts } from "@/lib/features/cartSlice";
import { useRouter } from "next/navigation";


const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { user } = useAppSelector((state: RootState) => state.user);
  const [isConfirmOrderOpen, setIsConfirmOrderOpen] = useState<boolean>(false);

  const {selectedProducts} = useAppSelector((state)=>state.cart);
  const handleCheckboxChange = (
    productId: string,
    price: number,
    quantity: number
  ) => {
    const isSelected = selectedProducts.some((p) => p.productId === productId);
    const newSelectedProducts = isSelected
      ? selectedProducts.filter((p) => p.productId !== productId)
      : [...selectedProducts, { productId, price, quantity }];
    dispatch(setSelectedProducts(newSelectedProducts));
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };


  return (
    <div className={`relative grid grid-cols-1 xl:grid-cols-2 w-full gap-10 xl:gap-2 p-3`}>
      <div className={`flex flex-col gap-2 ${isConfirmOrderOpen? 'hidden': 'block'}`}>
        {user?.cart?.map((c: any, idx) => {
          const name = c?.product?.productName?.replace(/\s+/g, "");
          const brand = c?.product?.productBrand?.replace(/\s+/g, "");
          return(
            <div key={idx} className={`w-full relative`}>
              <input
                type="checkbox"
                name="cart_product"
                value={c.product?._id}
                checked={selectedProducts.some(
                  (p) => p.productId === c.product?._id
                )}
                id={c.product?._id}
                onChange={() =>
                  handleCheckboxChange(
                    c.product?._id,
                    discountedPrice(c.product?.price, c.product?.discountPercent),
                    c.quantity
                  )
                }
                className="hidden"
              />
              <label
                htmlFor={c.product?._id}
                className={`relative w-full flex items-center p-2 rounded-xl ${
                  selectedProducts.some((p) => p.productId === c.product?._id)
                    ? "bg-orange-100"
                    : " bg-slate-50 "
                }`}
              >
                <Link
                  href={`/product/${brand+name+c.product?.size}`}
                  className="group h-[130px] w-[130px] rounded-lg overflow-hidden"
                >
                  <Image
                    alt=""
                    src={c?.product && c.product?.productImage[0]}
                    width={900}
                    height={900}
                    className="w-full h-full object-cover group-hover:opacity-75 group-hover:scale-125 custom-transition"
                  />
                </Link>
                <div className="px-5">
                  <div className="flex items-center gap-5">
                    <p className="text-lg font-semibold">
                      {c.product?.productBrand}
                    </p>
                    <p className="text-sm border border-black px-1">{c.product?.size}</p>
                  </div>
                  <p>{c.product?.productName}</p>
                  <div className="flex items-center gap-2">
                    <p className="line-through font-semibold text-gray-500">
                      ₹ {c.product?.price}
                    </p>
                    <p className="bg-gray-700 rounded-full text-white text-sm px-1">
                      {c.product?.discountPercent}% OFF
                    </p>
                    <p className="font-semibold">
                      ₹{" "}
                      {discountedPrice(
                        c.product?.price,
                        c.product?.discountPercent
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 mt-3">
                    <button
                      disabled={c.quantity === 1}
                      onClick={() =>
                        handleRemoveFromCart(c.product?._id, 1, dispatch)
                      }
                      className={`w-8 h-8 flex items-center justify-center bg-slate-200  custom-transition ${
                        c.quantity === 1
                          ? "cursor-not-allowed opacity-80"
                          : "cursor-pointer opacity-100 hover:bg-orange-400"
                      }`}
                    >
                      <ChevronLeft size={15} />
                    </button>
  
                    <div className="w-8 h-8 flex items-center justify-center">
                      <p className="">{c.quantity}</p>
                    </div>
  
                    <button
                      disabled={c.quantity === 5}
                      onClick={() => handleAddtoCart(c.product?._id, 1, dispatch)}
                      className={`w-8 h-8 flex items-center justify-center bg-slate-200  custom-transition ${
                        c.quantity === 5
                          ? "cursor-not-allowed opacity-80"
                          : "cursor-pointer opacity-100 hover:bg-orange-400"
                      }`}
                    >
                      <ChevronRight size={15} />
                    </button>
                  </div>
                </div>
                <button
                  className="absolute top-0 right-0 mt-4 mr-4"
                  onClick={() =>
                    handleRemoveFromCart(c.product?._id, c.quantity, dispatch)
                  }
                >
                  <X
                    size={18}
                    className="hover:text-orange-400 custom-transition"
                  />
                </button>
              </label>
            </div>
          )
        })}
      </div>

      <div className={`flex flex-col gap-2 w-full`}>
        <div className="bg-slate-50 w-full rounded-xl p-4">
          <p className="font-bold text-center text-xl">Selected Products</p>
          {selectedProducts.length > 0 ? (
            <div>
              <div className="min-h-[300px] mt-10 bg-white p-3 rounded-xl">
                <ul>
                  <li className="grid grid-cols-6 place-items-center font-semibold border-b border-orange-400">
                    <p>S.no</p>
                    <p className="col-span-2">Product</p>
                    <p>Price</p>
                    <p>Quantity</p>
                    <p className="">Total</p>
                  </li>
                  {selectedProducts.map((p, idx) => {
                    const productDetails = user?.cart.find(
                      (c: any) => c.product?._id === p.productId
                    )?.product;

                    return (
                      <li key={idx} className="">
                        <div className="grid grid-cols-6 place-items-center text-sm mt-2">
                          <p className="font-semibold">{idx + 1}.</p>
                          {productDetails ? (
                            <div className="col-span-2 text-wrap">
                              {productDetails?.productName?.length > 20 ? (
                                <p>
                                  {productDetails?.productName?.slice(0, 20)}...
                                </p>
                              ) : (
                                <p>{productDetails?.productName}</p>
                              )}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500">
                              Product not found
                            </p>
                          )}
                          <p>₹ {productDetails && p.price}</p>
                          <p>x{p.quantity} </p>
                          <p>₹ {productDetails && p.price * p.quantity}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-4 flex justify-between p-3 text-xl">
                <button
                  onClick={() => router.push('/user/place_order')}
                  className="border-2 text-black hover:text-white border-orange-400 hover:bg-orange-400 px-2 py-2 text-lg custom-transition"
                >
                  Place Order
                </button>
                <div className="flex gap-2 items-center font-semibold">
                  <p>Cart Total</p>
                  <p className="text-orange-500"> ₹{calculateTotalPrice()}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-[300px] flex justify-center items-center">
              <p className="text-lg font-semibold text-gray-500">
                No Products Selected
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
