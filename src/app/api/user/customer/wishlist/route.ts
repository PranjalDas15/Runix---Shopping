import dbConnect from "@/lib/dbConnect";
import { customerAuth } from "@/middleware/auth";
import UserModel from "@/models/User";
import { ExtendedRequest } from "@/types/ExtendedRequest";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
    return customerAuth(async(req: ExtendedRequest) => {
        const userId = req.user?.userId;
        if(!userId)
            return NextResponse.json({message: "UserId required."}, {status: 400})

        try {
            await dbConnect();
            const body = await req.json();
            const { productId } = body;

            if(!productId) 
                return NextResponse.json({message: "Product must be selected."}, {status: 400});

            const isAddedAlready = await UserModel.findOne({
                _id: userId,
                wishlist: productId
            });

            if(isAddedAlready)
                return NextResponse.json({message: "Product Already Added."}, {status: 400});

            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                {
                    $addToSet: {wishlist: productId}
                },
                {
                    new: true
                }
            ).populate({
                path: "wishlist",
                model: "Product"
            });

            if(!updatedUser)
                return NextResponse.json({message: "Something went wrong. Try again later."}, {status: 404});

            const update = {
                wishlist: updatedUser.wishlist
            };

            return NextResponse.json({message: "Added to wishlist.", update}, {status: 200});
        } catch (error: any) {
            return NextResponse.json({message: "Added to wishlist.", error: error.message}, {status: 500});
        }
    })(req)
}

export async function DELETE(req: Request) {
    return customerAuth(async(req: ExtendedRequest)=>{
        const userId = req.user?.userId;
        if(!userId)
            return NextResponse.json({message: "UserId required."}, {status: 400})

        try {
            await dbConnect();
            const body = await req.json();
            const { productId } = body;

            if(!productId) 
                return NextResponse.json({message: "Product must be selected."}, {status: 400});
            
            const updatedUser = await UserModel.findByIdAndUpdate(
                userId,
                {
                    $pull: {wishlist: productId}
                },
                {
                    new: true
                }
            ).populate({
                path: "wishlist",
                model: "Product"
            });

            if(!updatedUser)
                return NextResponse.json({message: "Something went wrong. Try again later."}, {status: 404});
            const update = {
                wishlist: updatedUser.wishlist
            } 
            return NextResponse.json({message: "Deleted Successfully.", update}, {status: 200});
    } catch(error: any) {
        return NextResponse.json({message: "Added to wishlist.", error: error.message}, {status: 500});
    }
})(req)
}