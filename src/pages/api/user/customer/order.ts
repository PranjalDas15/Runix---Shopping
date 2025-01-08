import dbConnect from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import OrderModel from "@/models/Order";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextApiResponse } from "next";

const handler = async (req: ExtendedRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    await dbConnect();
    const userId = req.user?.userId;

    if (!userId) return res.status(400).json({ message: "User required." });

    try {
      const { productId, quantity, price, totalPrice, paymentMethod } =
        req.body;
      if (!productId || !quantity || !price || !totalPrice || !paymentMethod)
        return res.status(400).json({ message: "Empty order." });
    
      if (typeof quantity !== 'number' || typeof price !== 'number' || typeof totalPrice !== 'number') {
        return res.status(400).json({ message: "Quantity, price, and totalPrice must be numbers." });
      }

      const orderStatus = "Processing";
      const paymentStatus = "Pending";

      const newOrder = new OrderModel({
        userId,
        order: {
          productId,
          quantity,
          price,
        },
        totalPrice,
        orderStatus: orderStatus,
        paymentMethod,
        paymentStatus: paymentStatus,
      });

      await newOrder.save();

      const order = {
        _id: newOrder._id,
        userId: newOrder.userId,
        order: newOrder.order,
        totalPrice: newOrder.totalPrice,
        orderStatus: newOrder.orderStatus,
        paymentMethod: newOrder.paymentMethod,
        paymentStatus: newOrder.paymentStatus,
      };

      return res.status(200).json({ message: "Order Placed.", order });
    } catch (error: any) {
      return res.status(500).json({ message: "Server Error.", error });
    }
  } else if (req.method === "PATCH") {
  } else {
    return res.status(400).json({ message: "Method not allowed." });
  }
};

export default customerAuth(handler);
