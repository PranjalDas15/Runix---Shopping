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
    if(req.method !== 'DELETE') return res.status(400).json({message: "Method not allowed."});

    const userId = req.user?.userId;
    if(!userId) return res.status(400).json({message: "UserId is missing."});

    await dbConnect();
    try {
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if(!deletedUser) return res.status(404).json({message: "User not found."});

        return res.status(200).json({message: "Admin deleted Successfully."})
    } catch (error) {
        return res.status(500).json({message: "Server Error."})
    }
}


export default sellerAuth(handler);