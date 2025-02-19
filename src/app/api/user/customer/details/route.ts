import {dbConnect} from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextResponse } from "next/server";

export async function GET(req: Request) { 

  return customerAuth(async (req: ExtendedRequest) => { 
    const userId = req.user?.userId;

    if (!userId) {
      return NextResponse.json({ message: "UserId required." }, { status: 400 });
    }

    try {
      await dbConnect();
      const user = await UserModel.findById(userId)
        .select("-password")
        .populate({
          path: "wishlist",
          model: "Product",
        })
        .populate({
          path: "cart.product",
          model: "Product",
        });

      if (!user) {
        return NextResponse.json({ message: "User not found." }, { status: 404 });
      }

      return NextResponse.json({ message: "Customer found.", user }, { status: 200 });
    } catch (error: any) {
      console.error("Error in GET /api/user/customer/details:", error);
      return NextResponse.json({ message: "Server Error.", error: error.message }, { status: 500 });
    }
  })(req);
}
