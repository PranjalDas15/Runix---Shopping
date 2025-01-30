import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { fetchOrder, placeOrder } from "@/lib/actions/orderActions";
import AddressInterface from "./AddressInterface";
import {
  clearSelectedProducts,
  setTotalPrice,
} from "@/lib/features/cartSlice";
import PaymentInterface from "./PaymentInterface";
import { LoaderCircle } from "lucide-react";

const ConfirmOrder = () => {
  const dispatch = useAppDispatch();
  const { selectedProducts, addressInfo, paymentMethod, totalPrice } =
    useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.order);

  const [isNext, setIsNext] = useState(false);
  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleOrder = async (e: any) => {
    if (user && user.address.length === 0) {
      e.preventDefault();
      toast.error("You must enter an address first.");
    } else if (selectedProducts.length > 0) {
      dispatch(setTotalPrice(calculateTotalPrice()));
      await placeOrder({
        //@ts-ignore
        userId: user?._id,
        orderItems: selectedProducts,
        addressInfo: addressInfo!,
        totalPrice: totalPrice!,
        paymentMethod: paymentMethod!,
      });
      dispatch(fetchOrder());
      dispatch(clearSelectedProducts());
    }
  };

  const handleCancel = () => {
    dispatch(clearSelectedProducts());
  };

  return (
    <div className="p-5 rounded-xl flex flex-col gap-4">
      <div className="flex w-full items-center justify-center pt-5">
        <div className="flex flex-col items-center">
          <div
            className={`w-4 h-4 border rounded-full ${
              isNext
                ? "bg-white border-gray-300"
                : "bg-orange-400 border-orange-400"
            }`}
          ></div>
          <p
            className={`${
              isNext ? "text-sm text-gray-300" : "text-base text-black"
            }`}
          >
            Address
          </p>
        </div>
        <div
          className={`w-[200px] border-t-2 -translate-y-3 ${
            isNext ? "border-orange-400" : "border-gray-300"
          }`}
        ></div>
        <div className="flex flex-col items-center">
          <div
            className={`w-4 h-4 border rounded-full ${
              !isNext
                ? "bg-white border-gray-300"
                : "bg-orange-400 border-orange-400"
            }`}
          ></div>
          <p
            className={`${
              !isNext ? "text-sm text-gray-300" : "text-base text-black"
            }`}
          >
            Payment
          </p>
        </div>
      </div>
      {isNext ? (
        <PaymentInterface />
      ) : (
        <AddressInterface
        />
      )}
      <div>
        <button
          onClick={() => {
            setIsNext(!isNext);
            dispatch(setTotalPrice(calculateTotalPrice()));
            console.log("Address:", addressInfo);
          }}
          className={`border py-2 px-3 border-orange-400 ${
            addressInfo && addressInfo?.address !== "" && !isNext
              ? "block"
              : "hidden"
          }`}
        >
          Next
        </button>
        <div className="flex gap-2 font-semibold">
          <button
            disabled={addressInfo === null}
            onClick={(e: any) => {
              handleOrder(e);
            }}
            className={`flex items-center justify-center w-28 py-2 border bg-white hover:bg-slate-100 ${
              !user?.address ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              "Place Order"
            )}
          </button>
          <button
            onClick={handleCancel}
            className="w-28 py-2 bg-red-400 hover:bg-red-500 text-white"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
