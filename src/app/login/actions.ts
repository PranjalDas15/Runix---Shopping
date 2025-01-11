/* eslint-disable */

import { clearOrder } from "@/lib/features/orderSlice";
import { clearUser } from "@/lib/features/userSlice";
import axios from "axios"
import toast from "react-hot-toast";


export const signUp = async(email: string, phone: string, password: string, role: string) => {
    try {
        const res = await axios.post('/api/auth/signup', {email, phone, password, role});
        const data = res?.data;

        if(!data) {
            toast.error(data.message);
            console.log(data.message);
            return false;
        }
        toast.success(data.message);
        return true;

    } catch (error: any) {
        toast.error(error.response.data?.message)
    }
}

export const signIn = async(email: string, password: string) => {
    try {
        const res = await axios.post('/api/auth/signin', {email, password});
        const data = res?.data;
        if(!data){
            toast.error(data.message);
        }
        toast.success(data.message);
        return data.user;
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
}

export const signOut = async(dispatch: any) => {
    try {
        const res = await axios.post('/api/auth/customerSignout');
        const data = res?.data;
        if(!data){
            toast.error(data.message);
            return false;
        }
        dispatch(clearUser());
        dispatch(clearOrder());
        toast.success(data.message);
        return true;
    } catch (error: any) {
        toast.error(error.response?.data.message)
    }
}
