import dbConnect from "@/lib/dbConnect";
import { adminAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { updateSchema } from "@/schemas/updateSchema";
import { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";

interface ExtendedRequest extends NextApiRequest {
    user?: {
        userId: string;
        role: string;
    };
}

const handler = async(req:ExtendedRequest, res: NextApiResponse) => {
    if(req.method !== 'PUT') return res.status(400).json({message: "Method not allowed."})

    await dbConnect();
    try {
        const userId = req.user?.userId;

        if(!userId) return res.status(400).json({message: "UserId required."});

        const validatedData = updateSchema.parse(req.body);
        const { phone, address} = validatedData;

        const updatedUser = await UserModel.findByIdAndUpdate( userId, {
            phone,
            address
        },
        {
            new: true
        });
        

        if(!updatedUser) {
            return res.status(404).json({message: "User not found."});
        }

        const user = {
            id: updatedUser._id,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            role: updatedUser.role
        }

        return res.status(200).json({message: "Admin updated successfully", user})
    } catch (error) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: error.errors.map((err) => err.message).join(", ")
            });
        }
        return res.status(500).json({message: "Server Error."})
    }
}

export default adminAuth(handler)