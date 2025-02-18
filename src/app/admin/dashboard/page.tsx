"use client";

import Loading from "@/components/Loading";
import { fetchProducts } from "@/lib/actions/fetchProducts";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { discountedPrice } from "@/lib/utils/utils";
import { Product } from "@/types/Product";
import {
  BadgePercent,
  DollarSign,
  IndianRupee,
  List,
  ListChecks,
  Locate,
  Mail,
  MapIcon,
  MapPin,
  Percent,
  PercentDiamond,
  Phone,
  Pin,
  ReceiptIndianRupee,
  Store,
  Vault,
  Verified,
} from "lucide-react";
import React, { useEffect, useState } from "react";

const page = () => {
  const { user, loading } = useAppSelector((state: RootState) => state.user);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(()=>{
    const fetchAndSetProducts = async()=> {
      const fetchedProducts = await fetchProducts();
      setProducts(fetchedProducts);
    }

    fetchAndSetProducts();
  }, [])

  const sellerProducts = products.filter((p) => p.seller._id === user?._id);
  const totalInventoryQuantity = () => {
    let sum = 0;
    const quantity = sellerProducts.map((p) => (sum += p.quantity));
    return quantity[quantity.length - 1];
  };

  const totalInventoryValue = () => {
    let sum = 0;
    const value = sellerProducts.map((p) => (sum += p.price));
    return value[value.length - 1];
  };

  const totalInventoryValueAfterDiscount = () => {
    let sum = 0;
    const value = sellerProducts.map(
      (p) => (sum += discountedPrice(p.price, p.discountPercent))
    );
    return value[value.length - 1];
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full h-full grid md:grid-flow-col md:grid-rows-3 gap-2 py-2 px-3 overflow-y-auto">
          <div className="rounded-xl p-5 bg-orange-400 flex flex-col text-white w-full col-span-1 row-span-1">
            <p className="text-[50px] text-center font-semibold">
              {user?.name}
            </p>
            <div className="flex justify-center py-2 lg:py-10">
              {user?.verified && <Verified size={40}/>}
            </div>
            <div className="flex justify-evenly items-end h-full text-[12px] lg:text-sm xl:text-base">
              <div className="relative flex flex-col items-center gap-2">
                <Phone className="peer"/>
                <p className="absolute lg:relative text-nowrap lg:text-wrap -top-10 lg:top-0 opacity-0 lg:opacity-100 peer-hover:opacity-100 custom-transition">+91 {user?.phone}</p>
              </div>
              <div className="relative flex flex-col items-center gap-2">
                <Mail className="peer"/>
                <p className="absolute lg:relative text-nowrap lg:text-wrap -top-10 lg:top-0 opacity-0 lg:opacity-100 peer-hover:opacity-100 custom-transition">{user?.email}</p>
              </div>
              <div className="relative flex flex-col items-center gap-2">
                <MapPin className="peer"/>
                <p className="absolute lg:relative text-nowrap lg:text-wrap -top-10 lg:top-0 opacity-0 lg:opacity-100 peer-hover:opacity-100 custom-transition">{user?.address}</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl flex flex-col gap-2 p-2 bg-slate-100 w-full col-span-1 row-span-1">
            <h3 className="py-1 text-center text-wrap text-xl lg:text-[25px] font-bold text-gray-600">
              Product Management
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-2 w-full h-full">
              <div className="relative w-1/3 flex flex-col items-center gap-2 group cursor-default">
                <p className="text-xl lg:text-[30px] text-orange-400 font-semibold">
                  {sellerProducts.length}
                </p>
                <Store />
                <p className="absolute text-sm text-gray-400 -bottom-6 custom-transition opacity-0 group-hover:opacity-100">
                  Total Products
                </p>
              </div>
              <div className="relative w-1/3 flex flex-col items-center gap-2 group cursor-default">
                <p className="text-xl lg:text-[30px] text-orange-400 font-semibold">
                  {totalInventoryQuantity()}
                </p>
                <ListChecks />
                <p className="absolute text-sm text-gray-400 -bottom-6 custom-transition opacity-0 group-hover:opacity-100">
                  Inventory Quantity
                </p>
              </div>
              <div className="relative w-1/3 flex flex-col items-center gap-2 group cursor-default">
                <p className="text-xl lg:text-[30px] text-orange-400 font-semibold">
                  ₹{totalInventoryValue()}
                </p>
                <IndianRupee />
                <p className="absolute text-sm text-gray-400 -bottom-6 custom-transition opacity-0 group-hover:opacity-100">
                  Inventory value
                </p>
              </div>
              <div className="relative w-1/3 flex flex-col items-center gap-2 group cursor-default">
                <p className="text-xl lg:text-[30px] text-orange-400 font-semibold">
                  ₹{totalInventoryValueAfterDiscount()}
                </p>
                <BadgePercent />
                <p className="absolute text-sm text-gray-400 -bottom-6 custom-transition opacity-0 group-hover:opacity-100">
                  Inventory on Discount
                </p>
              </div>
            </div>
          </div>
          <div className="border rounded-xl flex w-full row-span-3 col-span-2">
            <p>Total Products: {sellerProducts.length}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default page;
