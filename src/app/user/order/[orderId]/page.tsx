"use client";
import { cancelOrder, fetchOrder } from "@/lib/actions/orderActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ArrowLeft, LoaderCircle, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const page = () => {
  const param = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders, loading } = useAppSelector((state) => state.order);

  const order = orders?.find(
    (o) => o._id?.toString() === param?.orderId.toString()
  );

  const handleCancelOrder = async (orderId: string | null) => {
    if (order) {
      await cancelOrder({ orderId: orderId });
      dispatch(fetchOrder());
    }
  };
  return (
    <div className="pt-[70px] flex items-center justify-center w-full h-screen p-2 lg:p-0">
      
      <div className="relative pt-[70px] w-full min-h-full lg:w-[50vw] lg:min-h-[70vh] border rounded-xl bg-white p-4">
        <button
        className="absolute top-[20px] left-0 mx-4"
        onClick={() => router.back()}
      >
        <ArrowLeft className="hover:text-orange-400 custom-transition"/>
      </button>
        <div className="font-bold border-b border-black pb-2">
          <p className="">
            <span className="text-orange-400">Order ID: </span>
            {order?._id}
          </p>
          <p>
            <span className="text-orange-400">Order Status: </span>
            {order?.orderStatus}
          </p>
          <p>
            <span className="text-orange-400">Payment Method: </span>
            {order?.paymentMethod}
          </p>
          <div className="text-sm font-light">
            {order?.orderStatus === "Cancelled" ? <></> : <p>Expected delivery on {order?.updatedAt}</p>}
            
          </div>
        </div>

        <div className=" rounded-xl min-h-full mt-2 flex flex-col gap-2">
          {order?.order.map((item, index) => (
            <Link
              href={`/product/${item.productId._id}`}
              key={index}
              className="flex items-center p-2 bg-slate-50 hover:bg-orange-50"
            >
              <div className="h-20 w-20 overflow-hidden rounded-xl border">
                <Image
                  alt=""
                  src={item.productId.productImage[0]}
                  width={200}
                  height={200}
                  className="object-cover h-full w-full"
                />
              </div>
              <div className="px-5">
                <p className="text-lg font-semibold">
                  {item.productId.productName}
                </p>
                <p className="text-sm font-light">
                  {item.productId.productDesc}
                </p>
                <p className="text-orange-400">₹{item.price}</p>
                <p className="text-sm text-gray-500">x {item.quantity}</p>
              </div>
            </Link>
          ))}
        </div>
        <div>
          <p className="font-semibold text-lg">
            <span className="text-orange-400">Order Total: </span>
            ₹{order?.totalPrice}
          </p>
        </div>
        {order?.orderStatus !== "Cancelled" && (
          <div className="my-2 px-2">
            {loading ? (
              <button
                className="flex px-10 py-2 bg-red-200 text-white font-semibold overflow-hidden group rounded-xl"
              >
                <LoaderCircle className="animate-spin"/>
              </button>
            ) : (
              <button
                onClick={() => handleCancelOrder(order?._id ?? null)}
                className="flex px-3 py-2 bg-red-400 text-white font-semibold overflow-hidden group rounded-xl"
              >
                <div className="-translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-12 custom-transition -rotate-180 group-hover:rotate-180">
                  <X size={25} />
                </div>
                <p className="group-hover:translate-x-full -translate-x-3 opacity-100 group-hover:opacity-0 custom-transition">
                  Cancel Order
                </p>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default page;
