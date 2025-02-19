import {dbConnect} from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcrypt";
import { signUpSchema } from "@/schemas/signUpSchema";
import { z } from "zod";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const validatedData = signUpSchema.parse(body);
    const { email, phone, password, role } = validatedData;
    const name = body.name

    await dbConnect();

    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
        return NextResponse.json({ message: "User already exists with this email"}, {status: 409});


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserModel({
      email,
      password: hashedPassword,
      phone,
      role,
      name
    });
    
    await newUser.save();
    const savedUser = {
      _id: newUser._id,
      email: newUser.email,
      name:newUser.name,
      phone: newUser.phone,
      address: newUser.address,
      cart: newUser.cart,
      wishlist: newUser.wishlist,
      role: newUser.role,
    };
    return NextResponse.json({ message: "User registered successfully.", savedUser }, {status: 200});
  } catch (error) {
    if (error instanceof z.ZodError) {
        return NextResponse.json({ message: error.errors.map((err) => err.message).join(", ") }, {status: 400});
    }
    return NextResponse.json({ message: "Server Error.", error }, {status: 500});

  }
}
