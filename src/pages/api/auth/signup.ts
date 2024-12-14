import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import { signUpSchema } from "@/schemas/signUpSchema";
import { z } from "zod";


const UserSignUp = async (req: NextApiRequest, res: NextApiResponse) => {
    if( req.method !== 'POST') return res.status(405).json({message: "Method not allowed."});

    try {

        const validatedData = signUpSchema.parse(req.body);
        const {email, phone, password, role} = validatedData;
        
        await dbConnect();

        const existingUser = await UserModel.findOne({email});

        if (existingUser) return res.status(409).json({message: "User already exists with this email"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            email,
            password: hashedPassword,
            phone,
            role
        })
        await newUser.save();
        const savedUser = {
            _id: newUser._id,
            email: newUser.email,
            phone: newUser.phone,
            address: newUser.address,
            cart: newUser.cart,
            wishlist: newUser.wishlist,
            role: newUser.role,
        }

    res.status(201).json({ message: "User registered successfully.", savedUser })
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: error.errors.map((err) => err.message).join(", ")
            });
        }
        return res.status(500).json({message: "Server Error.", error})
    }

}


export default UserSignUp;