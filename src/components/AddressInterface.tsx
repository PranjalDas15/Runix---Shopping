import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { fetchOrder, placeOrder } from "@/lib/actions/orderActions";
import { LoaderCircle } from "lucide-react";
import { states } from "@/lib/assets";
import { updateUser } from "@/lib/actions/updateUser";
import { SelectedProducts, setAddressInfo } from "@/lib/features/cartSlice";

const AddressInterface = () => {
  const dispatch = useAppDispatch();
  const { selectedProducts, addressInfo } = useAppSelector((state) => state.cart);
  const { user } = useAppSelector((state) => state.user);
  const [name, setName] = useState("");
  const [addressString, setAddressString] = useState({
    address_line1: "",
    address_line2: "",
    address_pincode: "",
    address_state: "",
  });

  const fullAddress = Object.values(addressString)
    .filter((val) => val.trim() !== "")
    .join(", ");

  return (
    <>
      <ul className="bg-white p-2 rounded-xl border">
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
          <div className="w-full md:w-1/2 flex flex-col gap-2">
            <div>
              <label htmlFor="name" className="block">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="font-normal py-2 border border-orange-400 px-2 peer w-full"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="address_line1" className="block">
                Address Line 1
              </label>
              <input
                type="text"
                name="address_line1"
                id="address_line1"
                className="font-normal py-2 border border-orange-400 px-2 peer w-full"
                onChange={(e) =>
                  setAddressString({
                    ...addressString,
                    address_line1: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label htmlFor="address_line2" className="block">
                Address Line 2
              </label>
              <input
                type="text"
                name="address_line2"
                id="address_line2"
                className="font-normal py-2 border border-orange-400 px-2 peer w-full"
                onChange={(e) =>
                  setAddressString({
                    ...addressString,
                    address_line2: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3  md:items-center">
              <div>
                <label htmlFor="address_pincode" className="block">
                  Pincode
                </label>
                <input
                  type="text"
                  name="address_pincode"
                  id="address_pincode"
                  className="font-normal py-2 border border-orange-400 peer px-2"
                  onChange={(e) =>
                    setAddressString({
                      ...addressString,
                      address_pincode: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <label htmlFor="address_state" className="block">
                  State
                </label>
                <select
                  name="address_state"
                  id="address_state"
                  defaultValue={"Select State"}
                  className="py-2.5 border border-orange-400"
                  onChange={(e) =>
                    setAddressString({
                      ...addressString,
                      address_state: e.target.value,
                    })
                  }
                >
                  {states.map((state, index) => (
                    <option
                      value={state}
                      key={index}
                      disabled={state === "Select State"}
                    >
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <button
                className="border py-2 px-5"
                onClick={() => {
                  updateUser({ address: [fullAddress], name: name, dispatch });
                  console.log("Address Info:", addressInfo);
                }}
              >
                Save
              </button>
            </div>
          </div>
          {user?.address.length === 0 ? (
            <></>
          ) : (
            <div className="flex flex-col gap-2">
              {user?.address.map((address, index) => {
                return (
                  <div
                    key={index}
                    className="rounded-xl border overflow-hidden"
                  >
                    <input
                      type="radio"
                      name="address"
                      id={address}
                      value={address}
                      onChange={(e) => {
                        if (user) {
                          dispatch(
                            setAddressInfo({
                              name: user.name || "",
                              address: e.target.value,
                            })
                          );
                        }
                      }}
                      className="peer hidden"
                    />
                    <label
                      htmlFor={address}
                      className="peer-hover:bg-slate-100 peer-checked:bg-orange-50 w-full h-full flex flex-col gap-2 px-2 py-3"
                    >
                      <h1 className="text-lg">Address {index + 1}</h1>
                      <p className="">{user?.name}</p>
                      <p className="font-normal">{user?.phone}</p>
                      <p className="font-normal text-sm">{address}</p>
                    </label>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressInterface;
