import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const updateUserAddress = createAsyncThunk(
  "user/updateUserAddress",
  async ({ phone, address }: { phone: string; address: string }) => {
    if(!address){
        return toast.error("Need atleast one value.")
    }
    try {
      const response = axios.put(
        "/api/user/customer/update",
        {
          phone,
          address,
        },
        { withCredentials: true }
      );
      const data = (await response).data;
      console.log("Response:", data);
      return (await response).data.user;
    } catch (error: any) {
        toast.error(error);
    }
  }
);
