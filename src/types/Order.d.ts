import { Document, ObjectId } from "mongoose";

export interface SelectedProducts {
    productId: any;
    quantity: number;
    price: number
}

export interface Order extends Document {
    userId: any;
    order: SelectedProducts[];
    totalPrice: number;
    orderStatus: string;
    paymentMethod: string;
    paymentStatus: string;
}