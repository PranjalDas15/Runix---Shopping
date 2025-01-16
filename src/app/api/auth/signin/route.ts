import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { signInSchema } from "@/schemas/signInSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import generateToken from "@/utils/jwtToken";
import { z } from "zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = signInSchema.parse(body);
    const { email, password } = validatedData;

    await dbConnect();

    const isUser = await UserModel.findOne({ email });

    if (!isUser)
      return NextResponse.json({ message: "User not found." }, { status: 404 });

    if (!isUser.password)
      return NextResponse.json(
        { message: "User password is missing." },
        { status: 404 }
      );
    const decodedPassword = await bcrypt.compare(password, isUser.password);
    if (!decodedPassword)
      return NextResponse.json(
        { message: "Please enter correct password." },
        { status: 400 }
      );
    const { cookieName, token } = generateToken(isUser._id, isUser.role);
    const response = NextResponse.json(
      {
        message: "User logged in successfullt.",
        user: {
          id: isUser._id,
          email: isUser.email,
          phone: isUser.phone,
          address: isUser.address,
          role: isUser.role,
          wishlist: isUser.wishlist,
          cart: isUser.cart,
        },
      },
      { status: 200 }
    );
    response.headers.set(
      "Set-Cookie",
      `${cookieName}=${token}; HttpOnly; Path=/; Max-Age=86400`
    );

    return response;
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
}
