import { Document } from "mongoose";

export default interface User extends Document {
    email: string,
    phone: number,
    password: string,
    address: [string],
    role: string
}