
import dbConnect from "@/lib/dbConnect";
import CartModel from "@/models/Cart";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method === 'POST') {
        try {
            await dbConnect();

            const { user, products } = req.body;
            if( !products || products.length === 0 ){
                return res.status(400).json({message: "Cannot be empty!"})
            }

            const cart = await CartModel.findOne({ user });
            if(cart) {
                if(cart.products.length > 5) return res.status(400).json({message: "Quantity cannot be more than 5."})

                const newProduct = [...new Set([...cart.products, ...products])];
                cart.products = newProduct;
                await cart.save();
                return res.status(200).json({message: "Added to cart successfully.", cart})
            } else {
                const newCart = new CartModel({
                    user,
                    products,
                    createdAt: Date.now()
                });
                await newCart.save();
                return res.status(201).json({message: "Added to cart successfully.zx6yz", newCart})
            }

            
        } catch (error) {
            return res.status(500).json({message: "Error adding to cart", error})
        } 
    }   else {
        return res.status(405).json({message: "Method Not Allowed Yet."})     
    }
}


export default handler