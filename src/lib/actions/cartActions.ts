import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchUser } from "./fetchUser";
import toast from "react-hot-toast";
import axios from "axios";
import { User } from "@/types/User";


export const addToCart = createAsyncThunk("user/addToCart", async ({ productId, productQuantity }: { productId: string; productQuantity: number }) => {
    if (!productId || !productQuantity) {
        toast.error("Product information is missing!");
        return;
    }

    try {
        const res = await axios.patch<User>(
            '/api/user/customer/cart',
            { productId, productQuantity },
            { withCredentials: true }
        );

        if (res.status !== 200) {
            //@ts-ignore
            toast.error(res.data.message);
        }        
            //@ts-ignore
        toast.success(res.data?.message);
        return res.data.cart; 
    } catch (error: any) {
        console.log(error)
        toast.error(error.response.data?.message || "Cannot exceed 5.");
    }
});

export const updateCart = createAsyncThunk("user/updateCart", async ({ productId, productQuantity }: { productId: string; productQuantity: number }) => {
    if (!productId || !productQuantity) {
        toast.error("Product information is missing!");
        return;
    }

    try {
        const res = await axios.delete(
            '/api/user/customer/cart',
            { data: { productId, productQuantity }, withCredentials: true }
        );

        if (res.status !== 200) {
            toast.error(res.data.message);
        }

        fetchUser();
        toast.success(res.data.message);
        return res.data.cart;
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
});
