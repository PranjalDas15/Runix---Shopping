import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React from "react";
import { SelectedProduct } from "./Cart";
import toast from "react-hot-toast";
import { fetchOrder, placeOrder } from "@/lib/actions/orderActions";
import { redirect } from "next/navigation";
import { LoaderCircle } from "lucide-react";

const ConfirmOrder = ({
  selectedProducts,
  calculateTotalPrice,
  setIsConfirmOrderOpen,
  isConfirmOrderOpen,
}: {
  selectedProducts: SelectedProduct[];
  calculateTotalPrice: () => number;
  setIsConfirmOrderOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isConfirmOrderOpen: boolean;
}) => {
  const { orders, loading } = useAppSelector((state) => state.order);
  const { user } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const handleOrder = async () => {
    if (user && user.address.length === 0) {
      toast.error("You must enter an address first.");
      redirect("/user");
    } else if (selectedProducts.length > 0) {
      const toatalPrice = calculateTotalPrice();
      await placeOrder({
        //@ts-ignore
        userId: user?._id,
        orderItems: selectedProducts,
        totalPrice: toatalPrice,
        paymentMethod: "Cash on Delivery",
      });
      dispatch(fetchOrder());
    }
  };
  return (
    <div className="p-5 rounded-xl flex flex-col gap-4">
      <h1 className="text-xl font-bold text-center">Order Details</h1>
      <ul className="bg-white p-2 rounded-xl border min-h-[300px]">
        <li className="grid grid-cols-6 place-items-center font-semibold border-b border-orange-400">
          <p>S.no</p>
          <p className="col-span-2">Product</p>
          <p>Price</p>
          <p>Quantity</p>
          <p className="">Total</p>
        </li>
        {selectedProducts.map((p, idx) => {
          const productDetails = user?.cart.find(
            (c: any) => c.product._id === p.productId
          )?.product;

          return (
            <li key={idx} className="">
              <div className="grid grid-cols-6 place-items-center text-sm mt-2">
                <p className="font-semibold">{idx + 1}.</p>
                {productDetails ? (
                  <div className="col-span-2 text-wrap">
                    {productDetails.productName.length > 20 ? (
                      <p>{productDetails.productName.slice(0, 20)}...</p>
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

      <div className="bg-white p-2 rounded-xl border font-semibold flex flex-col gap-4 justify-center">
        <h3 className="text-lg">Address Information</h3>
        <div className="flex flex-col gap-2 justify-center">
          <p className="">
            Email: <span className="font-light">{user?.email}</span>
          </p>
          {user?.address.length === 0 ? (
            <button onClick={() => redirect("/user")} className="border w-32 py-2">Add Address</button>
          ) : (
            <p className="">
              Address: <span className="font-light">{user?.address}</span>
            </p>
          )}
          <p className="font-semibold">Cash on Delivery</p>
        </div>
      </div>
      <div className="flex gap-2 font-semibold">
        <button
          disabled={!user?.address}
          onClick={()=>{handleOrder(); setIsConfirmOrderOpen(!isConfirmOrderOpen)}}
          className={`flex items-center justify-center w-28 py-2 border bg-white hover:bg-slate-100 ${
            !user?.address ? "cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          {loading ? <LoaderCircle className="animate-spin" /> : "Place Order"}
        </button>
        <button
          onClick={() => setIsConfirmOrderOpen(!isConfirmOrderOpen)}
          className="w-28 py-2 bg-red-400 hover:bg-red-500 text-white"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ConfirmOrder;
