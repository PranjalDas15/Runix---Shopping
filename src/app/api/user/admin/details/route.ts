import {dbConnect} from "@/lib/dbConnect";
import { adminAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextResponse } from "next/server";

export async function GET(req: Request) { 

  return adminAuth(async (req: ExtendedRequest) => { 
    const userId = req.user?.userId;

    if (!userId) {
      return NextResponse.json({ message: "AdminId required." }, { status: 400 });
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
        return NextResponse.json({ message: "Admin not found." }, { status: 404 });
      }

      return NextResponse.json({ message: "Admin found.", user }, { status: 200 });
    } catch (error: any) {
      console.error("Error in GET /api/user/admin/details:", error);
      return NextResponse.json({ message: "Server Error.", error: error.message }, { status: 500 });
    }
  })(req);
}
