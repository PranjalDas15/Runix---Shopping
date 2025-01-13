import axios from "axios";
import toast from "react-hot-toast";
import { updateUserData } from "../features/userSlice";

export const updateUser = async ({
  phone,
  address,
  dispatch
}: {
  phone: string | undefined;
  address: string;
  dispatch: any
}) => {
  if (!address) {
    return toast.error("Need atleast one value.");
  }
  try {
    const response = await axios.put(
      "/api/user/customer/update",
      {
        phone,
        address,
      },
      { withCredentials: true }
    );
    if((await response).status !== 200) {
      toast.error(response.data.message);
    }
    dispatch(updateUserData(response.data.user))
    return response.data.user;
  } catch (error: any) {
    toast.error(error);
  }
};
