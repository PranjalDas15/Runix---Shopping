import dbConnect from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextApiResponse } from "next";



const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  if (req.method === "PATCH") {
    await dbConnect();
    const userId = req.user?.userId;

    if (!userId) return res.status(400).json({ message: "UserId required." });

    try {
      const { productId } = req.body;
      if(!productId) return res.status(400).json({message: "Product must be selected."})
      

      const isAddedAlready = await UserModel.findOne({ 
            _id: userId,
            wishlist: productId 
        });
        
      if(isAddedAlready) return res.status(400).json({message: "Product already added."})

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
            $addToSet: {wishlist: productId}
        },
        {
          new: true,
        }
      ).populate({
        path: "wishlist",
        model: "Product"
      });

      if (!updatedUser)
        return res.status(404).json({ message: "User not found." });

      const update = {
        wishlist: updatedUser.wishlist,
      };

      return res.status(200).json({ message: "Added to wishlist", update });
    } catch (error) {
      return res.status(500).json({ message: "Server Error.", error });
    }
  } else if( req.method === 'DELETE' ) {
      const userId = req.user?.userId;
      if (!userId) return res.status(400).json({ message: "UserId required." });
      try {
        await dbConnect();
        const { productId } = req.body;
        if(!productId) return res.status(422).json({message: "Need a Product."})

        const deletedProduct = await UserModel.findByIdAndUpdate(
          userId,
          { $pull: { wishlist: productId}}, 
          { new: true })
          .populate({
          path: "wishlist",
          model: "Product",
        });

        if(!deletedProduct) return res.status(404).json({message:"User not found."});
        const result = {
          wishlist: deletedProduct.wishlist
        }
        return res.status(200).json({message: "Deleted successfully.", result})
      } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({message: "Server Error."}) 
      }

  } else {
    return res.status(400).json({message: "Method not allowed."})
  }
};

export default customerAuth(handler);
