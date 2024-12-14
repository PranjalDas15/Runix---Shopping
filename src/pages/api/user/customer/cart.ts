import dbConnect from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import mongoose from "mongoose";
import { NextApiResponse } from "next";

{/* Trying 2 different methods of fetching data from mongo db.
  
  #1 - Fetching using mongo commands starts with $ 
  #2 - Fetching using javascript 


  updateing is done using mongo commands


*/}

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    await dbConnect();
    const userId = req.user?.userId;

    if (!userId) return res.status(400).json({ message: "UserId required." });

    try {
      const { productId, productQuantity } = req.body;
      if (!productId)
        return res.status(400).json({ message: "Product is required." });

      if (!productQuantity || typeof productQuantity !== "number" || productQuantity <= 0)
        return res.status(400).json({ message: "Invalid product quantity." });

      if (productQuantity > 5)
        return res.status(400).json({ message: "Maximum 5 items each." });
      
      await dbConnect();

      const cursor = await UserModel.findOne(
        {_id: userId},
        {cart: { $elemMatch: { product: productId}}}
      )


      console.log('Cart: ',cursor?.cart)

      if(cursor?.cart && cursor?.cart?.length > 0 ) {
        const fetchedQuantity = cursor.cart?.[0]?.quantity;
        const newQuantity = fetchedQuantity + productQuantity;

        if(newQuantity > 5)
          return res.status(400).json({message: "Maximum 5 items each."});

        const updatedUser = await UserModel.updateOne(
          {_id: userId, 'cart.product': productId },
          { $set: {'cart.$.quantity': newQuantity}}, {new: true}
        )
        return res
          .status(200).json({ message: "Added to cart.", updatedUser });
      } else {
        const updatedUser = await UserModel.updateOne(
          {_id: userId},
          {
            $push: {
              cart : {
                product: productId,
                quantity: productQuantity
              }
            }
          }, {new: true}

          
        )
        console.log(updatedUser);
        return res.status(200).json({ message: "Added to cart.", updatedUser });
        
      }
    } catch (error) {
      console.error("Error:", error);
      return res.status(500).json({ message: "Server Error.", error });
    }
  } else if (req.method === "DELETE") {
    const userId = req.user?.userId;
    if (!userId) return res.status(400).json({ message: "UserId required." });

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return res.status(400).json({ message: "Invalid UserId." });
    }

    try {
        await dbConnect();
        const { productId, productQuantity } = req.body;

        if (!productId) {
            return res.status(422).json({ message: "Product ID required." });
        }

        if (!productQuantity || typeof productQuantity !== "number" || productQuantity <= 0) {
            return res.status(400).json({ message: "Invalid product quantity." });
        }

        const user = await UserModel.findOne({ _id: userId });
        const productInCart = user?.cart.find(item => item.product.toString() === productId);

        if (!productInCart || productQuantity > productInCart.quantity) {
            return res.status(400).json({ message: "Invalid or excessive quantity." });
        }

        const newQuantity = productInCart.quantity - productQuantity;

        if (newQuantity === 0) {
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                { $pull: { cart: { product: productId } } },
                { new: true }
            );
            return res.status(200).json({ message: "Product removed.", updatedUser });
        } else {
            const updatedUser = await UserModel.findOneAndUpdate(
                { _id: userId, 'cart.product': productId },
                { $set: { 'cart.$.quantity': newQuantity } },
                { new: true }
            );
            return res.status(200).json({ message: `${productQuantity} removed.`, updatedUser });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ message: "Server Error.", error });
    }
} else {
    return res.status(400).json({ message: "Method not allowed." });
}
};

export default customerAuth(handler);
