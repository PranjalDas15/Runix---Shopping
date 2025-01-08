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
  _id: any;
  email: string;
  phone: number;
  password?:string;
  address: any[];
  role: string;
  wishlist: WishlistItem[];
  cart: CartItem[];
  order: Order[]
}
