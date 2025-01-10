import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
    try {
        const response = await axios.get(
            '/api/user/customer/details',
            {withCredentials: true}
        )

        if(response.status !== 200) {
            throw new Error("Failed to fetch user");
        }

        return response.data.user;
    } catch (error:any) {
        throw error;
    }
})
