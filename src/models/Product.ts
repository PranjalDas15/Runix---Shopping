import mongoose, { Schema, Document } from "mongoose";


export interface Product extends Document {
    productName: string,
    productDesc: string,
    productImage: [],
    category: string,
    quantity: number,
    price: number,
    size: string,
    discountPercent: number,
    gender: string,
    // seller: User[]
}

export const ProductSchema: Schema<Product> = new Schema ({
    productName: {
        type: String,
        required: true,
    },
    productDesc: {
        type: String,
        required: true,
    },
    productImage: {
        type: [String],
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    size: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discountPercent: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    // seller: [UserSchema]
})


const ProductModel = (mongoose.models.Product as mongoose.Model<Product>) || mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;