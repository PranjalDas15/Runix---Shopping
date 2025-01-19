import { Product } from "@/types/Product";
import mongoose, { Schema, Document, Types } from "mongoose";


interface ProductDocument extends Omit<Product, '_id'>, Document {}

export const ProductSchema: Schema<ProductDocument> = new Schema({
  productBrand: {
    type: String,
    required: true,
  },
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
  seller: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const ProductModel =
  (mongoose.models.Product as mongoose.Model<Product>) ||
  mongoose.model<Product>("Product", ProductSchema);

export default ProductModel;
