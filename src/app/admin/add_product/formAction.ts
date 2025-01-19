
import { Product } from "@/types/Product";
import axios from "axios"
import toast from "react-hot-toast";

export const addProduct = async(products: Product[]) => {
    try {
        const response = await axios.post('/api/products', JSON.stringify(products));
        if(response.status === 201) {
            toast.success("Product added successfully.");
            return response.data.savedProducts;
        }
    } catch (error: any) {
        toast.error(error?.response.data?.message);
    }
}