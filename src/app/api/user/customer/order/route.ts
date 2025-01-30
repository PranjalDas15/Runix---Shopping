import dbConnect from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import OrderModel from "@/models/Order";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return customerAuth(async (req: ExtendedRequest) => {
    const userId = req.user?.userId;

    if (!userId) {
      return NextResponse.json(
        { message: "UserId required." },
        { status: 400 }
      );
    }
    try {
      const body = await req.json();
      const { orderItems, addressInfo, totalPrice, paymentMethod } = body;
      if (!orderItems || !addressInfo || !totalPrice || !paymentMethod)
        return NextResponse.json({ message: "Empty Order" }, { status: 400 });
      orderItems.forEach((item: any) => {
        if (
          !item.productId ||
          typeof item.quantity !== "number" ||
          typeof item.price !== "number"
        )
          return NextResponse.json(
            {
              message:
                "Each item must have a valid productId, quantity, and price.",
            },
            { status: 400 }
          );
      });

      if (typeof totalPrice !== "number")
        return NextResponse.json(
          { message: "Total price must be a number." },
          { status: 400 }
        );

      await dbConnect();
      const newOrder = new OrderModel({
        userId,
        order: orderItems,
        addressInfo,
        totalPrice,
        orderStatus: "Processing",
        paymentMethod,
        paymentStatus: "Pending",
      });

      await newOrder.save();
      const order = {
        _id: newOrder._id,
        userId: newOrder.userId,
        order: newOrder.order,
        addressInfo: newOrder.addressInfo,
        totalPrice: newOrder.totalPrice,
        orderStatus: newOrder.orderStatus,
        paymentMethod: newOrder.paymentMethod,
        paymentStatus: newOrder.paymentStatus,
      };

      return NextResponse.json({ message: "Order Placed.", order });
    } catch (error: any) {
      return NextResponse.json(
        { message: "Server Error.", error: error.message },
        { status: 500 }
      );
    }
  })(req);
}

export async function GET(req: Request) {
  return customerAuth(async (req: ExtendedRequest) => {
    const userId = req.user?.userId;

    if (!userId) {
      return NextResponse.json(
        { message: "UserId required." },
        { status: 400 }
      );
    }

    try {
      await dbConnect();
      const orders = await OrderModel.find({ userId: userId }).populate({
        path: "order.productId",
        model: "Product",
      });

      return NextResponse.json(
        { message: "Order fetched successfully.", orders },
        { status: 201 }
      );
    } catch (error: any) {
      return NextResponse.json(
        { message: "Server Error.", error: error.message },
        { status: 500 }
      );
    }
  })(req);
}

export async function PATCH(req: Request) {
  return customerAuth(async (req: ExtendedRequest) => {
    const body = await req.json();
    const {orderId} = body;
    if(!orderId) 
        return NextResponse.json({message: "Order Id required."},{status: 400});
    try {
        await dbConnect();
        const order = await OrderModel.findById(orderId);
        if(!order)
            return NextResponse.json({message: "Order not found."},{status: 404});

        order.orderStatus = "Cancelled";
        await order.save();
        return NextResponse.json({message: "Order Cancelled."}, {status: 201});
    } catch (error: any) {
      return NextResponse.json(
        { message: "Server Error.", error: error.message },
        { status: 500 }
      );
    }
  })(req);
}

