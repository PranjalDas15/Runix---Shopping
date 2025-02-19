import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    try {
        const response = await axios.get(
            '/api/user/customer/details',
            {withCredentials: true}
        )
        return response.data.user;
    } catch (error:any) {
        throw error;
    }
})

export const fetchSeller = createAsyncThunk("user/fetchSeller", async () => {
    try {
        const response = await axios.get(
            '/api/user/seller/details',
            {withCredentials: true}
        )
        return response.data.user;
    } catch (error:any) {
        throw error;
    }
})


