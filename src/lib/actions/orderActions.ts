import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const placeOrder = async ({
  userId,
  orderItems,
  totalPrice,
  paymentMethod,
}: {
  userId: string;
  orderItems: {
    productId: string;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  paymentMethod: string;
}) => {
  try {
    const res = await axios.post(
      "/api/user/customer/order",
      {
        userId,
        orderItems,
        totalPrice,
        paymentMethod,
      },
      {
        withCredentials: true,
      }
    );

    if (res.status !== 200) {
      toast.error(res.data.message);
      console.log(res.data.message);
    }
    toast.success(res.data.message);
    return res.data.order;
  } catch (error: any) {
    toast.error(error.response.data.message);
    console.log(error.response.data.message);
  }
};

export const fetchOrder = createAsyncThunk("order/fetchOrder", async () => {
  try {
    const res = await axios.get("/api/user/customer/order", {
      withCredentials: true,
    });
    return res.data.orders;
  } catch (error: any) {
    toast.error(error.response.data.message);
  }
});

export const cancelOrder = async ({orderId}:{orderId: string | null}) => {
  try {
    const res = await axios.patch('/api/user/customer/order', {orderId}, {withCredentials: true});
    if(res.status !== 200){
      toast.error(res.data.message);
    }
    toast.success(res.data.message);
    return res.data.order;
  } catch (error: any) {
    toast.error(error.response.data.message)
  }
};
