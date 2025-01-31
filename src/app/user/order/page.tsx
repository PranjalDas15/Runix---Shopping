"use client";

import Shop from "@/components/shopComponents/Shop";
import { useAppSelector } from "@/lib/hooks";
import { dateToString, expectedDelivery } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  const { orders } = useAppSelector((state) => state.order);


  const sortedOrder = [...orders].sort(
    (a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
  );



  return (
    <>
      <div className="min-h-[70vh] w-full bg-white mt-[70px] flex justify-center">
        <div className=" mx-4 py-3 w-full md:w-[70%]">
          <div className="flex gap-1 text-[12px]">
            <Link href={"/"} className="text-orange-400">
              Home
            </Link>
            <p>/</p>
            <Link href={"/user"} className="text-orange-400">
              Profile
            </Link>
            <p>/</p>
            <p> Order</p>
          </div>
          <div className="py-5">
            <h1 className="font-bold text-xl md:text-2xl">My Orders</h1>
          </div>
          <div className="flex flex-col gap-2">
            {sortedOrder && sortedOrder.length > 0 ? (
              sortedOrder.map((o, index) => (
                <Link
                  href={`/user/order/${o._id}`}
                  key={index}
                  className="border p-3 hover:bg-slate-100 flex flex-col gap-3 rounded-xl"
                >
                  <div>
                    <p className="text-xl font-bold">Order {o.orderStatus}</p>
                    <span className="rounded-full text-[12px] px-2 py-0.5 text-white bg-orange-400 font-semibold">
                      {o.paymentMethod}
                    </span>
                  </div>
                  <div className="flex gap-4 text-sm">
                    <p>{}</p>
                    <p>
                      Order placed on:{" "}
                      {o.createdAt ? dateToString(o.createdAt) : "N/A"}
                    </p>
                    <p>
                      {o.orderStatus === "Cancelled"
                        ? ""
                        : o.orderStatus === "Delivered"
                        ? "Delivered on:"
                        : "Expected delivery date:"}
                      <span>
                        {o.orderStatus === "Cancelled"
                          ? ""
                          : o.orderStatus === "Delivered"
                          ? o.updatedAt && dateToString(o.updatedAt)
                          : o.createdAt && expectedDelivery(o.createdAt)}
                      </span>
                    </p>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-2 ">
                    {o.order.map((item, index) => (
                      <div key={index} className="flex gap-2">
                        <div className="h-20 w-20 overflow-hidden rounded-xl border">
                          <Image
                            alt=""
                            src={item.productId.productImage[0]}
                            width={200}
                            height={200}
                            className="object-cover h-full w-full"
                          />
                        </div>
                        <div>
                          <p className="font-semibold text-lg">
                            {item.productId.productName}
                          </p>
                          <p className="text-orange-400 font-semibold">
                            ₹ {item.price}
                          </p>
                          <p className="text-sm ">x {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div>
                    <p className="font-bold text-lg">
                      Order Total : ₹{o.totalPrice}
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <div className="w-full h-[50vh] xl:h-[80vh] flex flex-col items-center justify-center gap-10">
                <p className="font-semibold text-xl">Your orders is empty!</p>
                <Link
                  href={"/shop"}
                  className="text-wrap py-2 px-3 border-2 border-orange-400 bg-white hover:bg-orange-400 hover:text-white custom-transition"
                >
                  Continue Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
