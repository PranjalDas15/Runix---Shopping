import dbConnect from "@/lib/dbConnect";
import ProductModel from "@/models/Product";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = req.json();
  const {
    productName,
    productDesc,
    productImage = [],
    category,
    quantity,
    size,
    price,
    discountPercent,
    gender,
  } = await body;
  if (
    !productName ||
    !productDesc ||
    !productImage ||
    !category ||
    !quantity ||
    !size ||
    !price ||
    !discountPercent ||
    !gender
  )
    return NextResponse.json({ message: "Fill all fields." }, { status: 400 });
  try {
    await dbConnect();
    const newProduct = new ProductModel({
        productName,
        productDesc,
        productImage,
        category,
        quantity,
        size,
        price,
        discountPercent,
        gender,
      });
      const savedProduct = await newProduct.save();
      return NextResponse.json({message: "Product Added.", savedProduct}, {status: 201});
  } catch (error:any) {
    return NextResponse.json(
        { message: "Server Error", error: error.message },
        { status: 500 }
      );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const products = await ProductModel.find();
    return NextResponse.json({ message: "Success", products }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Server Error", eerror: error.message },
      { status: 500 }
    );
  }
}
