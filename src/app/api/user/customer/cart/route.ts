import dbConnect from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  return customerAuth(async (req: ExtendedRequest) => {
    const userId = req.user?.userId;
    if (!userId)
      return NextResponse.json(
        { message: "UserId required." },
        { status: 400 }
      );

    try {
      const body = await req.json();
      const { productId, productQuantity } = body;

      if (!productId)
        return NextResponse.json(
          { message: "Product must be selected." },
          { status: 400 }
        );

      if (
        !productQuantity ||
        typeof productQuantity !== "number" ||
        productQuantity <= 0
      )
        return NextResponse.json(
          { message: "Invalid product quantity." },
          { status: 400 }
        );
      if (productQuantity > 5)
        return NextResponse.json(
          { message: "Cannot exceed more than 5." },
          { status: 400 }
        );

      await dbConnect();
      const cursor = await UserModel.findOne(
        { _id: userId },
        {
          cart: {
            $elemMatch: { product: productId },
          },
        }
      );

      if (cursor?.cart && cursor?.cart?.length > 0) {
        const fetchedQuantity = cursor?.cart?.[0]?.quantity;
        const newQuantity = fetchedQuantity + productQuantity;

        if (newQuantity > 5)
          return NextResponse.json(
            { message: "Cannot exceed more than 5." },
            { status: 400 }
          );

        const updatedUser = await UserModel.updateOne(
          { _id: userId, "cart.product": productId },
          { $set: { "cart.$.quantity": newQuantity } },
          { new: true }
        );

        if (!updatedUser)
          return NextResponse.json(
            { message: "Something went wwrong. Try again later." },
            { status: 400 }
          );

        const user = await UserModel.findById(userId).populate("cart.product");

        return NextResponse.json(
          {
            message: `Updated by x${productQuantity}`,
            cart: user?.cart || [],
          },
          { status: 200 }
        );
      } else {
        const updatedUser = await UserModel.updateOne(
          { _id: userId },
          {
            $push: {
              cart: {
                product: productId,
                quantity: productQuantity,
              },
            },
          },
          { new: true }
        );
        if (!updatedUser)
          return NextResponse.json(
            { message: "Something went wwrong. Try again later." },
            { status: 400 }
          );
        const user = await UserModel.findById(userId).populate("cart.product");
        return NextResponse.json(
          { message: "Added to Cart.", cart: user?.cart || [] },
          { status: 200 }
        );
      }
    } catch (error: any) {
      return NextResponse.json(
        { message: "Server Error.", error: error.message },
        { status: 500 }
      );
    }
  })(req);
}

export async function DELETE(req: Request) {
  return customerAuth(async (req: ExtendedRequest) => {
    const userId = req.user?.userId;
    if (!userId)
      return NextResponse.json(
        { message: "UserId required." },
        { status: 400 }
      );
    try {
      const body = await req.json();
      const { productId, productQuantity } = body;

      if (!productId)
        return NextResponse.json(
          { message: "Product must be selected." },
          { status: 400 }
        );

      if (
        !productQuantity ||
        typeof productQuantity !== "number" ||
        productQuantity <= 0
      )
        return NextResponse.json(
          { message: "Invalid product quantity." },
          { status: 400 }
        );
      await dbConnect();
      const user = await UserModel.findOne({ _id: userId });
      const productInCart = user?.cart.find(
        (item: { product: any; quantity: number }) =>
          item.product.toString() === productId
      );
      if (!productInCart || productQuantity > productInCart.quantity)
        return NextResponse.json(
          { message: "Invalid Quantity." },
          { status: 400 }
        );
      const newQuantity = productInCart?.quantity - productQuantity;

      if (newQuantity === 0) {
        const updatedUser = await UserModel.findByIdAndUpdate(
          userId,
          {
            $pull: { cart: { product: productId } },
          },
          { new: true }
        ).populate("cart.product");
        return NextResponse.json({
          message: `Removed x${productQuantity}`,
          cart: updatedUser?.cart,
        });
      } else {
        const updatedUser = await UserModel.findOneAndUpdate(
          { _id: userId, "cart.product": productId },
          { $set: { "cart.$.quantity": newQuantity } },
          { new: true }
        ).populate("cart.product");

        return NextResponse.json(
          {
            message: `Removed x${productQuantity}`,
            cart: updatedUser?.cart || [],
          },
          { status: 200 }
        );
      }
    } catch (error: any) {
      return NextResponse.json(
        { message: "Server Error.", error: error.message },
        { status: 500 }
      );
    }
  })(req);
}
