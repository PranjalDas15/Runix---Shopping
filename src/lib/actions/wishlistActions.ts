import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchUser } from "./fetchUser";

export const addToWishlist = async (productId: string) => {
    try {
        const res = await axios.patch(
            '/api/user/customer/wishlist',
        {productId},
        {withCredentials: true})

        if(res.status !== 200) {
            toast.error(res.data.message);
        }
        fetchUser();
        toast.success("Added to wishlist.");
        return res.data.update.wishlist;
    } catch (error: any) {
        return toast.error(error?.response.data.message);
    }
};

export const deleteFromWishlist = async (productId: string) => {
    try {
        const res = await axios.delete(
            '/api/user/customer/wishlist',
            {data: {productId}, withCredentials: true}
        )

        if(res.status !== 200) {
            toast.error(res.data.message);
        }
        toast.success("Removed from wishlist.");
        return res.data.update.wishlist;
    } catch (error:any) {
        toast.error(error?.response.data.message);
    }
};