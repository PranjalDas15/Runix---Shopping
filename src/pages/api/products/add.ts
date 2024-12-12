import dbConnect from "@/lib/dbConnect";
import { adminAuth } from "@/middleware/auth";

import ProductModel from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";



const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if( req.method !== 'POST') return res.status(405).json({message: "Method not allowed."});

    try {
        await dbConnect();

        const { productName, productDesc, productImage = [], category, quantity, size, price, discountPercent, gender } = req.body;
        if(!productName || !productDesc || !productImage || !category || !quantity || !size || !price || !discountPercent || !gender) {
            return res.status(400).json({message: "Fill all fields."});
        }

        const newProduct = new ProductModel({
            productName,
            productDesc,
            productImage,
            category,
            quantity,
            size,
            price,
            discountPercent,
            gender
        });

        const savedProduct = await newProduct.save();

        return res.status(201).json({message: "success", savedProduct})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Server Error", error})
    }
    
}

export default adminAuth(handler);