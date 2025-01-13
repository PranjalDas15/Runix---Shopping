import { Order } from "./Order";

export interface WishlistItem {
  _id: any;
  productName: string;
  productDesc: string;
  productImage: string[];
  category: string;
  quantity: number;
  size: string;
  price?: number;
  discountPercent?: number;
  gender: string;
}

export interface CartItem {
  product: {
    _id: any;
    productName: string;
    productDesc: string;
    productImage: string[];
    category: string;
    quantity: number;
    size: string;
    price?: number;
    discountPercent?: number;
    gender: string;
  };
  quantity: number;
  _id: any;
}

export interface User {
  _id: string;
  email: string;
  phone: string;
  password?:string;
  address: string[];
  role: string;
  wishlist: WishlistItem[];
  cart: CartItem[];
}
