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
      const { orderItems, totalPrice, paymentMethod } = req.body;
      if (!orderItems || !totalPrice || !paymentMethod)
        return res.status(400).json({ message: "Empty order." });

      orderItems.forEach((item: any) => {
        if (
          !item.productId ||
          typeof item.quantity !== "number" ||
          typeof item.price !== "number"
        ) {
          throw new Error(
            "Each item must have a valid productId, quantity, and price."
          );
        }
      });

      if (typeof totalPrice !== "number") {
        return res
          .status(400)
          .json({ message: "Total price must be a number." });
      }

      const orderStatus = "Processing";
      const paymentStatus = "Pending";

      const newOrder = new OrderModel({
        userId,
        order: orderItems,
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
  } else if (req.method === "GET") {
    const userId = req.user?.userId;
    if (!userId) return res.status(400).json({ message: "UserId required." });

    try {
      await dbConnect();
      const orders = await OrderModel.find({ userId: userId })
      .populate({
        path: 'order.productId',
        model: "Product"
      });

      return res
        .status(200)
        .json({ message: "Order fetched successfully.", orders });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error." });
    }
  } else if(req.method === 'PATCH'){
    const {orderId} = req.body;
    if (!orderId) return res.status(400).json({ message: "Order ID required." });

    try {
      await dbConnect();
      const order = await OrderModel.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: "Order not found." });
      }

      order.orderStatus = "Cancelled";
      await order.save();
      return res.status(200).json({message: "Order Cancelled", order});
    } catch (error) {
      return res.status(500).json({ message: "Internal server error.", error });
    }
  } else {
    return res.status(400).json({ message: "Method not allowed." });
  }
};

export default customerAuth(handler);
