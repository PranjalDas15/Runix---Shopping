import User from "@/types/User";
import mongoose, { Schema } from "mongoose";


// export interface User extends Document {
//     email: string;
//     phone: number;
//     password: string;
//     address: [string];
//     role: string;
// }

export const UserSchema: Schema<User> = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    address: [
       { type: String }
    ],
    role: {
        type: String,
        enum: ['Customer', 'Admin', 'Seller'],
        default: 'Customer',
        required: true
    }

});


const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema);

export default UserModel;