"use client";

import { Product } from "@/types/Product";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { addToCart, updateCart } from "@/lib/actions/cartActions";
import { setSelectedProducts } from "@/lib/features/userSlice";

interface SelectedProduct {
  id: any;
  price: number;
  quantity: number;
  total?: number;
}

const Cart: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, selectedProducts } = useAppSelector((state: RootState) => ({
    user: state.user.user,
    selectedProducts: state.user.selectedProducts as SelectedProduct[],
  }));
  console.log("Selected Products: ", selectedProducts);

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleCheckboxChange = (product: any, isChecked: boolean) => {
    const updatedSelectedProducts = isChecked
      ? [
          ...selectedProducts,
          {
            id:product._id,
            price: user?.cart.find((c: any) => c.product._id === product._id)
            ?.product.price || 0,
            quantity: user?.cart.find((c: any) => c.product._id === product._id)?.quantity || 1,
          },
        ]
      : selectedProducts.filter((p: any) => p.id !== product._id);

    dispatch(setSelectedProducts(updatedSelectedProducts));
  };

  const discountedPrice = (price: number, discountPercent: number) => {
    const discountAmount = (price * discountPercent) / 100;
    return price - discountAmount;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-10 xl:gap-2 p-3">
      <div className="flex flex-col gap-2">
        {user?.cart?.map((c: any, idx) => (
          <div key={idx} className="w-full relative">
            <input
              type="checkbox"
              name="cart_product"
              value={c.product._id}
              checked={selectedProducts.some((p) => p.id === c.product.id)}
              id={c.product._id}
              onChange={() =>
                handleCheckboxChange(
                  c.product,
                  !selectedProducts.some((p: any) => p.id === c.product.id)
                )
              }
              className="hidden"
            />
            <label
              htmlFor={c.product._id}
              className={`relative w-full flex items-center p-2 rounded-xl ${
                selectedProducts.some((p) => p.id === c.product.id)
                  ? "bg-orange-100"
                  : " bg-slate-50 "
              }`}
            >
              <Link
                href={`/product/${c.product._id}`}
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
                <p className="text-lg font-semibold">{c.product.productName}</p>
                <p>{c.product.productDesc}</p>
                <div className="flex items-center gap-2">
                  <p className="line-through font-semibold text-gray-500">
                    ₹ {c.product.price}
                  </p>
                  <p className="bg-gray-700 rounded-full text-white text-sm px-1">
                    {c.product.discountPercent}% OFF
                  </p>
                  <p className="font-semibold">
                    ₹{" "}
                    {discountedPrice(
                      c.product.price,
                      c.product.discountPercent
                    )}
                  </p>
                </div>
                <div className="flex items-center gap-1 mt-3">
                  <button
                    disabled={c.quantity === 1}
                    onClick={() =>
                      dispatch(
                        updateCart({
                          productId: c.product._id,
                          productQuantity: 1,
                        })
                      )
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
                    onClick={() =>
                      dispatch(
                        addToCart({
                          productId: c.product._id,
                          productQuantity: 1,
                        })
                      )
                    }
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
                onClick={() => {
                  dispatch(
                    updateCart({
                      productId: c.product._id,
                      productQuantity: c.quantity,
                    })
                  );
                }}
              >
                <X
                  size={18}
                  className="hover:text-orange-400 custom-transition"
                />
              </button>
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-2 w-full">
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
                      (c: any) => c.product.id === p.id
                    )?.product;

                    return (
                      <li key={idx} className="">
                        <div className="grid grid-cols-6 place-items-center text-sm mt-2">
                          <p className="font-semibold">{idx + 1}.</p>
                          {productDetails ? (
                            <div className="col-span-2 text-wrap">
                              {productDetails.productName.length > 20 ? (
                                <p>
                                  {productDetails.productName.slice(0, 20)}...
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
                          <p>
                            ₹{" "}
                            {discountedPrice(
                              p.price,
                              productDetails?.discountPercent || NaN
                            )}
                          </p>
                          <p>x{p.quantity} </p>
                          <p>
                            ₹{" "}
                            {discountedPrice(
                              p.price,
                              productDetails?.discountPercent || NaN
                            ) * p.quantity}
                          </p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="mt-4 flex justify-between p-3 text-xl">
                {/* <button
                  onClick={handleOrder}
                  className="border-2 text-black hover:text-white border-orange-400 hover:bg-orange-400 px-2 py-2 text-lg custom-transition"
                >
                  Place Order
                </button> */}
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
