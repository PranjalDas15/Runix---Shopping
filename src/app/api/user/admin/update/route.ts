import {dbConnect} from "@/lib/dbConnect";
import { adminAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { updateSchema } from "@/schemas/updateSchema";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextResponse } from "next/server";
import { z } from "zod";

export async function PUT(req: Request) {
  return adminAuth(async (req: ExtendedRequest) => {
    const userId = req.user?.userId;

    if (!userId) {
      return NextResponse.json(
        { message: "AdminId required." },
        { status: 400 }
      );
    }
    const body = await req.json();
    const validatedData = updateSchema.parse(body);
    const { phone, address } = validatedData;
    try {
        await dbConnect();
        const updatedUser = await UserModel.findByIdAndUpdate( userId , 
            {
                phone,
                address
            },
            { new: true }
        );

        if(!updatedUser)
            return NextResponse.json({message: "Something went wrong. Try again later."}, {status: 404});

        const user = {
            _id: updatedUser._id,
            email: updatedUser.email,
            phone: updatedUser.phone,
            address: updatedUser.address,
            role: updatedUser.role,
            wishlist: updatedUser.wishlist,
            cart: updatedUser.cart,
        }

        return NextResponse.json({message: "Admin updated successfully.", user}, {status: 201});

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
