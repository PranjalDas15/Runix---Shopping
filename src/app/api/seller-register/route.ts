import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  const body = await req.json();
  const { email, phone, name, address, role } = body;
  if (!body) {
    return NextResponse.json({ message: "Fill all fields." }, { status: 400 });
  }
  try {
    await dbConnect();
    const existingUser = await UserModel.findOne({ email });

    if (existingUser)
      return NextResponse.json(
        { message: "User already exists with this email" },
        { status: 409 }
      );

    const password = name.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new UserModel({
      email,
      password: hashedPassword,
      phone,
      name,
      address,
      verified: "Verified",
      role,
    });
    const savedUser = {
      _id: newUser._id,
      email: newUser.email,
      password: newUser.password,
      name: newUser.name,
      phone: newUser.phone,
      address: newUser.address,
      role: newUser.role,
      verified: newUser.verified,
    };

    await newUser.save().catch(error => {
        console.log("Error: ", error)
    });
    return NextResponse.json(
      { message: "User registered successfully.", savedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error.", error },
      { status: 500 }
    );
  }
}
