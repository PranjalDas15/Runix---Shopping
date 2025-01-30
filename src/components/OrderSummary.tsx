import { useAppSelector } from "@/lib/hooks";
import React from "react";

const OrderSummary = () => {
  const { selectedProducts, addressInfo, paymentMethod, totalPrice } =
    useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  return (
    <div className="flex flex-col gap-2 border rounded-xl px-2 py-3">
      <div className="border rounded-xl px-3 py-2">
        <h3 className="text-lg font-semibold py-3 text-center">Products</h3>
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
                        <p>{productDetails?.productName?.slice(0, 20)}...</p>
                      ) : (
                        <p>{productDetails?.productName}</p>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">Product not found</p>
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
      <div className="border rounded-xl px-3 py-2">
        <h3 className="text-lg font-semibold py-3 text-center">Address Details</h3>
        <p className="text-lg font-semibold">{addressInfo?.name}</p>
        <p className="text-gray-500">{user?.email}</p>
        <p className="text-gray-500">{user?.phone}</p>
        <p>{addressInfo?.address}</p>
      </div>
      <div className="flex justify-end py-5">
        <p className="text-xl font-bold">Total Price: ₹ {totalPrice}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
