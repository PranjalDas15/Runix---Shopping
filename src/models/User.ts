
import mongoose, { Schema } from "mongoose";
import { User } from "@/types/User";

export const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    address: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        enum: ['Customer', 'Admin', 'Seller'],
        default: 'Customer',
        required: true
    },
    wishlist: {
        type: [
            {   
                type: Schema.Types.ObjectId,
                ref: "Product"
            }
        ],
        default: []
    },
    cart: {
        type: [{
            product: {
                type: Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            },
    }],
    default: []
    },
});

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;