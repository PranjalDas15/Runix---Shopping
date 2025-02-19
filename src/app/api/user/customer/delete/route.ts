import {dbConnect} from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  return customerAuth(async (req: ExtendedRequest) => {
    const userId = req.user?.userId;

    if (!userId) {
      return NextResponse.json({ message: "UserId required." }, { status: 400 });
    }

    try {
        await dbConnect();
        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if(!deletedUser) 
            return NextResponse.json({message: "Something went wrong. Try again later"}, {status: 404});

        return NextResponse.json({message: "Customer Deleted Successfully."},{status: 200})
    } catch (error: any) {
      return NextResponse.json(
        { message: "Server Error.", error: error.message },
        { status: 500 }
      );
    }
  })(req);
}
