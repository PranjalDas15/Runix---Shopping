import dbConnect from "@/lib/dbConnect";
import { sellerAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";

interface ExtendedRequest extends NextApiRequest {
    user?: {
        userId: string;
        role: string;
    };
}

const handler = async(req: ExtendedRequest, res: NextApiResponse) => {
    if(req.method !== 'GET') return res.status(400).json({message: "Method not allowed."})

    await dbConnect();
    try {
        const userId = req.user?.userId;

        if(!userId) return res.status(400).json({message: "UserId required."});

        const user = await UserModel.findById(userId).select('-password');

        if(!user) return res.status(404).json({message: "User not found."});

        return res.status(200).json({message: "Seller found.", user})
    } catch (error) {
        return res.status(400).json({message: "Server Error."})
    }
}


export default sellerAuth(handler);