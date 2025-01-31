"use client";

import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState, useEffect } from "react";
import { ArrowLeft, Check, Loader, Pen, User2Icon, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteAddress, updateUser } from "@/lib/actions/updateUser";
import toast from "react-hot-toast";
import Loading from "@/components/Loading";

const Page = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const [isPhoneEdit, setIsPhoneEdit] = useState(false);
  const [isNameEdit, setIsNameEdit] = useState(false);
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    if (user) {
      setName(user.name || "");
      setPhone(user.phone || "");
    }
  }, [user]);

  const handlePhoneUpdate = () => {
    if (phone) {
      updateUser({ phone: phone, dispatch });
      toast.success("Phone number updated.");
      setIsPhoneEdit(false);
    }
  };

  const handleNameUpdate = () => {
    if (name.trim()) {
      updateUser({ name: name.trim(), dispatch });
      toast.success("Name updated.");
      setIsNameEdit(false);
    }
  };

  const handleDeleteAddress = ({ address }: { address: string }) => {
    deleteAddress({ address, dispatch });
  };

  if (!isMounted) {
    return <Loading />;
  }

  return (
    <div className="flex flex-col gap-2 pt-[70px] px-2 items-center">
      <div className="relative w-full md:w-[700px] py-5 border rounded-xl">
        <div className="flex items-center justify-center">
          <User2Icon size={50} />
        </div>
        <div className="flex flex-col items-center gap-2 py-2">
          <div className="flex gap-2 items-center">
            {isNameEdit ? (
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="py-2 px-2 border border-orange-400"
                  placeholder="Enter your name"
                />
              </div>
            ) : (
              <p className="text-xl font-semibold">
                {user?.name || "User"}
              </p>
            )}

            {!isNameEdit ? (
              <button
                className="text-orange-400"
                onClick={() => setIsNameEdit(true)}
              >
                <Pen size={15} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button disabled={loading} onClick={handleNameUpdate}>
                  {loading ? (
                    <Loader size={20} />
                  ) : (
                    <Check className="text-green-400" size={20} />
                  )}
                </button>
                <button onClick={() => {
                  setIsNameEdit(false);
                  setName(user?.name || "");
                }}>
                  <X className="text-red-400" size={20} />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <div className="flex gap-2 items-center">
            {isPhoneEdit ? (
              <div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                  className="py-2 px-2 border border-orange-400"
                  placeholder="Enter phone number"
                  maxLength={10}
                />
              </div>
            ) : (
              <p className="text-gray-500">
                {user?.phone ? `+91 ${user.phone}` : "No phone number"}
              </p>
            )}

            {!isPhoneEdit ? (
              <button
                className="text-orange-400"
                onClick={() => setIsPhoneEdit(true)}
              >
                <Pen size={15} />
              </button>
            ) : (
              <div className="flex gap-1">
                <button disabled={loading} onClick={handlePhoneUpdate}>
                  {loading ? (
                    <Loader size={20} />
                  ) : (
                    <Check className="text-green-400" size={20} />
                  )}
                </button>
                <button onClick={() => {
                  setIsPhoneEdit(false);
                  setPhone(user?.phone || "");
                }}>
                  <X className="text-red-400" size={20} />
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          onClick={() => router.back()}
          className="absolute top-2 left-2 custom-transition hover:text-orange-400"
        >
          <ArrowLeft />
        </button>
      </div>
      <div className="flex flex-col gap-2 w-full md:w-[700px]">
        <h2 className="font-bold text-xl text-center">Addresses</h2>
        {loading ? (
          <Loading />
        ) : user?.address?.length ? (
          user.address.map((address, index) => (
            <div
              key={index}
              className="relative bg-slate-50 hover:bg-slate-100 rounded-xl px-4 py-4"
            >
              <h3 className="font-semibold text-lg">Address {index + 1}</h3>
              <p>{address}</p>
              <button
                onClick={() => handleDeleteAddress({ address })}
                className="absolute top-2 right-2 hover:text-orange-400"
              >
                <X size={15} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-4">No addresses found</div>
        )}
      </div>
    </div>
  );
};

export default Page;