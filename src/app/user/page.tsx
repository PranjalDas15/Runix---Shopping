"use client";

import { useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import Link from "next/link";
import { User} from "lucide-react";
import Modal from "@/components/Modal";

const page = () => {
  const { user } = useAppSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <div className=" relative min-h-[70vh] w-full bg-white mt-[70px] flex justify-center">
        <div className=" mx-4 py-3 w-full md:w-[70%]">
          <div className="flex gap-1 text-[12px]">
            <Link href={"/"} className="text-orange-400">
              Home
            </Link>
            <p>/</p>
            <p>Profile</p>
          </div>
          <div className="py-5">
            <h1 className="font-bold text-xl md:text-2xl">My Profile</h1>
          </div>
          <div className="flex gap-5 w-full">
            <div className="w-40 h-40 p-3 rounded-full bg-gray-400 border-8 border-gray-500 flex items-center justify-center">
              <User className="text-white" size={600} />
            </div>
            <div className="flex flex-col gap-5 w-full">
              <div className="text-xl">
                <p>
                  <span className="font-semibold text-xl ">Email:</span>{" "}
                  {user?.email}
                </p>
                <p>
                  <span className="font-semibold text-xl ">Phone Number:</span>{" "}
                  +91 {user?.phone}
                </p>
              </div>
              <div className="bg-slate-100 w-1/2 h-full custom-transition p-2 rounded-xl flex flex-col">
                <h2 className="pb-4 pt-2 font-semibold text-xl border-b border-orange-400">
                  Address
                </h2>
                {user && user?.address?.length > 0 ? (
                  <div className="py-2 flex flex-col gap-3">
                    <div className="bg-white rounded-xl p-4">
                      {user &&
                        user?.address.map((a, index) => (
                          <div key={index} className="relative">
                            {/* <button className="absolute top-0 right-0">
                              <X />
                            </button> */}
                            <p>{a}</p>
                          </div>
                        ))}
                    </div>
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className={`border p-2 custom-transition bg-white hover:text-white font-semibold ${isOpen ? 'border-red-400 hover:bg-red-400' : 'border-orange-400 hover:bg-orange-400'}`}
                    >
                      {isOpen ? "Cancel":"Update Address"}
                    </button>
                    <div
                      className={` bg-white items-center flex justify-center overflow-hidden custom-transition ${
                        isOpen ? "h-full" : "h-0"
                      }`}
                    >
                      <Modal/>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col h-full w-full items-center justify-center">
                    <p>No address on record.</p>
                    <button onClick={()=>setIsOpen(!isOpen)} className="border p-2 border-orange-400 bg-white hover:bg-orange-400 custom-transition hover:text-white font-semibold">
                      Add Address
                    </button>
                    <div
                      className={` bg-white items-center flex justify-center overflow-hidden custom-transition ${
                        isOpen ? "h-full" : "h-0"
                      }`}
                    >
                      <Modal/>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
