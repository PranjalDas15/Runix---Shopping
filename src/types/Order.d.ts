import { Document, ObjectId } from "mongoose";

export interface OrderItem {
  productId: {
    _id: string | null;
    productBrand: string | null;
    productName: string | null;
    productDesc: string | null;
    productImage: string[];
    category: string | null;
    quantity: number | null;
    price: number | null;
    size: string | null;
    discountPercent: number | null;
    gender: string | null;
  };
  quantity: number | null;
  price: number | null;
}

export interface Order extends Document {
  userId: string | null;
  order: OrderItem[];
  addressInfo: {
    name: string,
    address: string
  };
  totalPrice: number | null;
  orderStatus: string | null;
  paymentMethod: string | null;
  paymentStatus: string | null;
}
