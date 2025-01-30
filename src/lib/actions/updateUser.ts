import axios from "axios";
import toast, { ToastBar } from "react-hot-toast";
import { updateUserData } from "../features/userSlice";
import { any } from "zod";

export const updateUser = async ({
  phone,
  name,
  address,
  dispatch
}: {
  phone?: string | undefined;
  name?: string;
  address?: string[];
  dispatch: any
}) => {
  if (!phone && !name && (!address || address.length === 0)) {
    return toast.error("Need atleast one value.");
  }
  try {
    const response = await axios.put(
      "/api/user/customer/update",
      {
        phone,
        name,
        address,
      },
      { withCredentials: true }
    );
    if(response.status !== 201) {
      toast.error(response.data.message);
    }
    dispatch(updateUserData(response.data.user))
    return response.data.user;
  } catch (error: any) {
    toast.error(error);
  }
};

export const deleteAddress = async ({address, dispatch}:{address: string, dispatch: any}) =>{
  if(!address || address === ""){
    return toast.error("Enter an address to delete.");
  }

  try {
    const response = await axios.delete("/api/user/customer/update",
      {data: {address}, withCredentials: true}
    );
    if(response.status !== 200){
      toast.error(response.data.message);
    }
    dispatch(updateUserData(response.data.user))
    return response.data.user;
  } catch (error:any) {
    toast.error(error);
  }
}
