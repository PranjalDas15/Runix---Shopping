import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import { fetchUser } from "./fetchUser";

export const addToWishlist = createAsyncThunk("user/addToWishlist", async (productId: string) => {
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
        toast.error("You need to log in first.");
        throw error;
    }
});

export const deleteFromWishlist = createAsyncThunk("user/removeFromWishlist", async (productId: string) => {
    try {
        const res = await axios.delete(
            '/api/user/customer/wishlist',
            {data: {productId}, withCredentials: true}
        )

        if(res.status !== 200) {
            toast.error(res.data.message);
        }
        toast.success("Removed from wishlist.");
        return res.data.result.wishlist;
    } catch (error:any) {
        toast.error("You need to log in first.");
        throw error;
    }
});