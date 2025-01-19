import { User } from "./User";

export interface Product {
    _id: any,
    productBrand: string;
    productName: string;
    productDesc: string;
    productImage: string[]; 
    category: string;
    quantity: number;
    price: number;
    size: string;
    discountPercent: number;
    gender: string;
    seller?: any
  }