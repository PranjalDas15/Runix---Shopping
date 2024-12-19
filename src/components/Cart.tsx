"use client";

import { useUser } from "@/Context/userContext";
import { Product } from "@/types/Product";
import Image from "next/image";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Link from "next/link";

interface CartProduct {
  product: Product;
  quantity: number;
}

interface SelectedProduct {
  id: string;
  price: number;
  quantity: number;
  total?: number
}

const Demo: React.FC = () => {
  const { currnetUser, updateCart, addToCart } = useUser();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>(
    []
  );

  const [order, setOrder] = useState<SelectedProduct[]>([]);

  const handleOrder = () => {
    if (selectedProducts) {
      setOrder(selectedProducts);
      console.log("My order: ", order);
    }
  };

  const handleCheckboxChange = (
    productId: string,
    price: number,
    quantity: number
  ) => {
    setSelectedProducts((prev) =>
      prev.find((p) => p.id === productId)
        ? prev.filter((p) => p.id !== productId)
        : [...prev, { id: productId, price, quantity }]
    );
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const discountedPrice = (price: number, discountPercent: number) => {
    const discountAmount = (price * discountPercent) / 100;
    return price - discountAmount;
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 w-full gap-10 xl:gap-2 p-3">
      <div className="flex flex-col gap-2">
        {currnetUser?.cart.map((c: CartProduct, idx: number) => (
          <div key={idx} className="w-full relative">
            <input
              type="checkbox"
              name="cart_product"
              value={c.product._id}
              checked={selectedProducts.some((p) => p.id === c.product._id)}
              id={c.product._id}
              onChange={() =>
                handleCheckboxChange(
                  c.product._id,
                  discountedPrice(c.product.price, c.product.discountPercent),
                  c.quantity
                )
              }
              className="hidden"
            />
            <label
              htmlFor={c.product._id}
              className={`relative w-full flex items-center p-2 rounded-xl ${
                selectedProducts.some((p) => p.id === c.product._id)
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
                  src={c.product.productImage[0]}
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
                    onClick={() => updateCart(c.product._id, 1)}
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
                    onClick={() => addToCart(c.product._id, 1)}
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
                  updateCart(c.product._id, c.quantity);
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
                    const productDetails = currnetUser?.cart.find(
                      (c: CartProduct) => c.product._id === p.id
                    )?.product;

                    return (
                      <li key={idx} className="">
                        <div className="grid grid-cols-6 place-items-center text-sm mt-2">
                          <p className="font-semibold">{idx + 1}.</p>
                          <div className="col-span-2 text-wrap">
                            {productDetails.productName.length > 20 ? (
                              <p>
                                {productDetails.productName.slice(0, 20)}...
                              </p>
                            ) : (
                              <p>{productDetails.productName}</p>
                            )}
                          </div>
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
                  onClick={handleOrder}
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

export default Demo;
