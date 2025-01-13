import { updateUser } from "@/lib/actions/updateUser";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import toast from "react-hot-toast";


const Modal: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, loading } = useAppSelector((state) => state.user);
  const [address, setAddress] = useState<string | null>(null);

  return (
    <div className="w-full h-full p-3">
      <form
        onSubmit={() => {
          if (user && !loading) {
            const newAddress = address?.trim() || user.address.toString();
              updateUser({
                phone: user?.phone?.toString(),
                address: newAddress,
                dispatch
              });
          } else {
            toast.error("Phone no. is required.");
          }
        }}
        className="w-full h-full flex flex-col gap-2"
      >
        <textarea
          rows={5}
          className="p-2 border border-orange-400"
          placeholder="Enter Address"
          onChange={(e) => {
            setAddress(e.target.value)
          }}
        ></textarea>
        <div>
          <button
            type="submit"
            disabled = {!address || address === ""}
            className={`border border-orange p-2 font-semibold bg-orange-400 ${!address || address === "" ? 'cursor-not-allowed bg-opacity-40 ' : 'cursor-pointer bg-opacity-100  hover:bg-orange-500'}`}
          >
            Update
          </button>
          
        </div>
      </form>
    </div>
  );
};

export default Modal;
