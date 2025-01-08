import { fetchUser } from "@/lib/actions/fetchUser";
import { clearUser } from "@/lib/features/userSlice";
import store from "@/lib/store";
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
        toast.error(error.response.data.message)
    }
}

export const signIn = async(email: string, password: string) => {
    try {
        const res = await axios.post('/api/auth/signin', {email, password});
        const data = res?.data;
        if(!data){
            toast.error(data.message);
            console.log(data.message);
            return false;
        }
        store.dispatch(fetchUser())
        toast.success(data.message);
        return true;
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
}

export const signOut = async() => {
    try {
        const res = await axios.post('/api/auth/customerSignout');
        const data = res?.data;
        if(!data){
            toast.error(data.message);
            return false;
        }
        store.dispatch(clearUser());
        toast.success(data.message);
        return true;
    } catch (error: any) {
        toast.error(error.response.data.message)
    }
}