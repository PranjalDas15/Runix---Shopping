import {dbConnect} from "@/lib/dbConnect";
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

      const isNameSame = name && existingUser.name === name;
      const isPhoneSame = phone && existingUser.phone === phone;

      const filteredNewAddresses =
        address?.filter((newAddr) =>
          !existingUser.address.some(
            (existingAddr) => existingAddr.trim() === newAddr.trim()
          )
        ) || [];

      const isAddressSame =
        filteredNewAddresses.length === 0 && !!address?.length;

      if (isNameSame && isPhoneSame && isAddressSame) {
        return NextResponse.json(
          { message: "No changes detected." },
          { status: 400 }
        );
      }

      const updatedAddress = address
        ? [...existingUser.address, ...filteredNewAddresses]
        : existingUser.address;

      const updatedUser = await UserModel.findByIdAndUpdate(
        userId,
        {
          ...(name && !isNameSame && { name }),
          ...(phone && !isPhoneSame && { phone }),
          address: updatedAddress,
        },
        { new: true }
      );

      if (!updatedUser) {
        return NextResponse.json(
          { message: "Something went wrong. Try again later." },
          { status: 404 }
        );
      }

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



export async function DELETE(req: Request) {
  return customerAuth(async (req: ExtendedRequest) => {
    const userId = req.user?.userId;

    if (!userId) {
      return NextResponse.json(
        { message: "UserId required." },
        { status: 400 }
      );
    }

    const body = await req.json();
    let { address } = body;

    if (!address) {
      return NextResponse.json(
        { message: "Address is required." },
        { status: 400 }
      );
    }

    try {
      await dbConnect();

      const existingUser = await UserModel.findById(userId);
      if (!existingUser) {
        return NextResponse.json(
          { message: "User not found." },
          { status: 404 }
        );
      }

      address = Array.isArray(address) ? address : [address];

      const updatedAddresses = existingUser.address.filter(
        (addr) => !address.includes(addr.trim())
      );

      if (updatedAddresses.length === existingUser.address.length) {
        return NextResponse.json(
          { message: "Address not found in user's address list." },
          { status: 404 }
        );
      }

      existingUser.address = updatedAddresses;
      await existingUser.save();

      const user = {
        _id: existingUser._id,
        email: existingUser.email,
        name: existingUser.name,
        phone: existingUser.phone,
        address: existingUser.address,
        role: existingUser.role,
        wishlist: existingUser.wishlist,
        cart: existingUser.cart,
      };

      return NextResponse.json(
        { message: "Customer updated successfully.", user },
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
