"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { fetchOrder, placeOrder } from "@/lib/actions/orderActions";
import { clearSelectedProducts, setTotalPrice } from "@/lib/features/cartSlice";

import { LoaderCircle } from "lucide-react";
import PaymentInterface from "@/components/PaymentInterface";
import AddressInterface from "@/components/AddressInterface";
import OrderSummary from "@/components/OrderSummary"; // Step 3 Component
import OrderSuccess from "@/components/OrderSuccess";

const Page = () => {
  const dispatch = useAppDispatch();
  const { selectedProducts, addressInfo, paymentMethod, totalPrice } =
    useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const { loading } = useAppSelector((state) => state.order);
  const [orderPlaced, setOrderPlaced] = useState<boolean>(false);

  const steps = ["Address", "Payment", "Order"];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
    }
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
  };

  const handleOrder = async (e: any) => {
    if (!user || user.address.length === 0) {
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
      setOrderPlaced(!orderPlaced)
    }
  };

  const handleCancel = () => {
    dispatch(clearSelectedProducts());
  };

  const isNextDisabled =
    (currentStepIndex === 0 && (!addressInfo || !addressInfo.address)) ||
    (currentStepIndex === 1 && !paymentMethod);

  return (
    <div className="w-full min-h-[70vh] flex justify-center">
      <div className={`p-5 rounded-xl flex flex-col gap-4 pt-[70px] py-3 w-full lg:w-[60%] ${orderPlaced ? 'hidden' : 'block'}`}>
        {/* Step Indicator */}
        <div className="flex w-full items-center justify-center pt-5">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-4 h-4 border rounded-full ${
                    index <= currentStepIndex
                      ? "bg-orange-400 border-orange-400"
                      : "bg-white border-gray-300"
                  }`}
                ></div>
                <p
                  className={`text-sm ${
                    index <= currentStepIndex ? "text-black" : "text-gray-300"
                  }`}
                >
                  {step}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`w-20 border-t-2 -translate-y-3 ${
                    index < currentStepIndex
                      ? "border-orange-400"
                      : "border-gray-300"
                  }`}
                ></div>
              )}
            </div>
          ))}
        </div>

        {/* Step Components */}
        {currentStepIndex === 0 && <AddressInterface />}
        {currentStepIndex === 1 && <PaymentInterface />}
        {currentStepIndex === 2 && <OrderSummary />}

        {/* Buttons */}
        <div className="flex justify-between mt-4">
          <button
            onClick={prevStep}
            disabled={currentStepIndex === 0}
            className={`border py-2 px-4 ${
              currentStepIndex === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "border-gray-400 bg-white hover:bg-gray-100"
            }`}
          >
            Previous
          </button>

          {currentStepIndex < 2 ? (
            <button
              onClick={nextStep}
              disabled={isNextDisabled}
              className={`py-2 px-4 border ${
                isNextDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "border-orange-400 bg-orange-400 text-white hover:bg-orange-500"
              }`}
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleOrder}
              className="py-2 px-4 border bg-green-500 text-white hover:bg-green-600"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Place Order"
              )}
            </button>
          )}
        </div>
      </div>
      <div className={`pt-[70px] ${orderPlaced ? 'block': 'hidden'}`}>
        <OrderSuccess/>
      </div>
    </div>
  );
};

export default Page;
