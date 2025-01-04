import dbConnect from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextApiResponse } from "next";


const handler = async(req: ExtendedRequest, res: NextApiResponse) => {
    if(req.method !== 'GET') return res.status(400).json({message: "Method not allowed."})
    
    const userId = req.user?.userId;
    if(!userId) return res.status(400).json({message: "UserId required."});
    try {
        await dbConnect();
        const user = await UserModel.findById(userId).select('-password')
        .populate({
            path: 'wishlist',
            model: "Product"
        })
        .populate({
            path: 'cart.product',
            model: "Product"
        });

        if(!user) return res.status(404).json({message: "User not found."});

        return res.status(200).json({message: "Customer found.", user})
    } catch (error) {
        return res.status(400).json({message: "Server Error."})
    }
}


export default customerAuth(handler);