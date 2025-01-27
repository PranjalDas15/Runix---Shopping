import dbConnect from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { updateSchema } from "@/schemas/updateSchema";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: Request) {
  return customerAuth(async (req: ExtendedRequest) => {
    const userId = req.user?.userId;

    if (!userId) {
      return NextResponse.json(
        { message: "UserId required." },
        { status: 400 }
      );
    }
    const body = await req.json();
    const validatedData = updateSchema.parse(body);
    const { phone, address } = validatedData;
    const { name } = body;
    try {
      await dbConnect();
      const existingUser = await UserModel.findById(userId);
      if (!existingUser) {
        return NextResponse.json(
          { message: "User not found." },
          { status: 404 }
        );
      }

      const updatedAddress = address
        ? [
            ...existingUser.address,
            ...address.filter((newAddr) => !!newAddr.trim()),
          ]
        : existingUser.address;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          ...(name && { name }),
          ...(phone && { phone }), 
          address: updatedAddress, 
        },
        { new: true }
      );

      if (!updatedUser)
        return NextResponse.json(
          { message: "Something went wrong. Try again later." },
          { status: 404 }
        );

      const user = {
        _id: updatedUser._id,
        email: updatedUser.email,
        name: updatedUser.name,
        phone: updatedUser.phone,
        address: updatedUser.address,
        role: updatedUser.role,
        wishlist: updatedUser.wishlist,
        cart: updatedUser.cart,
      };

      return NextResponse.json(
        { message: "Customer updated successfully.", user },
        { status: 201 }
      );
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        return NextResponse.json(
          { message: error.errors.map((err) => err.message).join(", ") },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Server Error.", error: error.message },
        { status: 500 }
      );
    }
  })(req);
}
