import {dbConnect} from "@/lib/dbConnect";
import { sellerAuth } from "@/middleware/auth";
import ProductModel from "@/models/Product";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  return sellerAuth(async (req: ExtendedRequest) => {
    const userId = req?.user?.userId;
    console.log("User:", userId);

    if (!userId) {
      return NextResponse.json({ message: "SellerId required." }, { status: 400 });
    }
    const body = await req.json();

  if (!Array.isArray(body) || body.length === 0) {
    return NextResponse.json({ message: "Invalid input format or empty array." }, { status: 400 });
  }

  try {
    await dbConnect();

    const products = body.map((product) => ({
      productBrand: product.productBrand,
      productName: product.productName,
      productDesc: product.productDesc,
      productImage: product.productImage,
      category: product.category,
      quantity: product.quantity,
      size: product.size,
      price: product.price,
      discountPercent: product.discountPercent,
      gender: product.gender,
      seller: userId
    }));

    const savedProducts = await ProductModel.insertMany(products);
    return NextResponse.json({ message: "Products added successfully.", savedProducts }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error", error: error.message },
      { status: 500 }
    );
  }
  })(req)
}

export async function GET() {
  try {
    await dbConnect();
    const products = await ProductModel.find().populate("seller");

    return NextResponse.json({ message: "Success", products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error", eerror: error.message },
      { status: 500 }
    );
  }
}
