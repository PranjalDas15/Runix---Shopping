import dbConnect from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import WishlistModel from "@/models/Wishlist";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextApiResponse } from "next";

const handler = async(req: ExtendedRequest, res: NextApiResponse) => {
    if( req.method === 'GET') {
        try {
            res.setHeader('Cache-Control', 'no-store');
             await dbConnect();
             const userId = req.user?.userId; 
             if(!userId) return res.status(400).json({message: "User Id Required."})
             
             const wishlist = await WishlistModel.findOne({user: userId}).populate({
                path: "products",
                model: "Product"
             });
             if(!wishlist) {
                 return res.status(400).json({message: "No wishlist yet"});
             }

             return res.status(200).json({message: "Success", wishlist});

        } catch (error) {
         return res.status(500).json({message: "Error", error});
        }
 }
    else if( req.method === 'POST') {
            try {
                await dbConnect();
                const user = req.user?.userId;
                if(!user) return res.status(401).json({message: "Log in First."})
                const { products } = req.body;
                if( !products ) return res.status(200).json({message: "Your wishlist is empty."})
    
                const wishlist = await WishlistModel.findOne({ user });
                if(wishlist) {
                    const isAlreadyAdded = products.find((productId: string) =>
                        wishlist.products.find(
                            (existingProductId) => existingProductId.toString() === productId.toString()
                        )
                    );
    
                    if (isAlreadyAdded) {
                        return res.status(304).json({ message: "Item already added." });
                    }
                    const newProduct = [...new Set([...wishlist.products, ...products])];
                    wishlist.products = newProduct;
                    await wishlist.save();
    
                    return res.status(200).json({message: "Added to wishlist.", wishlist});
                } else {
                    const newWishlist = new WishlistModel({
                        user,
                        products,
                        createdAt: Date.now()
                    });
                    await newWishlist.save();
                    return res.status(201).json({message: "Wishlist created successfully.", wishlist})
                }
    
                
            } catch (error) {
                return res.status(500).json({message: "Error adding to wishlist", error})
            } 
    }
    else if (req.method === 'DELETE') {
        try {
            await dbConnect();
            
            const user = req.user?.userId;
            if(!user) return res.status(404).json({message: "Log in First."})
            
            const { products } = req.body;
            if( !products ) return res.status(400).json({message: "No product selected."})
            
            const wishlist = await WishlistModel.findOneAndUpdate(
                { user },
                { $pull: { products: { $in: products } } },
                { new: true }
            );
            if(!wishlist) return res.status(404).json({message: "No wishlist found."})        
            return res.status(200).json({message: "Removed Successfully.", wishlist})

        } catch (error) {
            return res.status(500).json({message: "Server Error."})
        }
    }

}


export default customerAuth(handler);