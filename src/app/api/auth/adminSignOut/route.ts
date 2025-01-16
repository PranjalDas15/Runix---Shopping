import { NextResponse } from "next/server";

export async function POST (req: Request) {
    try {
        const cookies =  req.headers.get("cookie") || '';
        const authCookie = cookies.includes('auth_Admin=')
        if(!authCookie)
            return NextResponse.json({message: "No active session found."}, {status: 400});

        const response = NextResponse.json({message: "Logged out successfully."}, {status: 200});

        response.headers.set('Set-Cookie', `auth_Admin=; HttpOnly; Path=/; Max-Age=0`);
        return response;
    } catch (error: any) {
        return NextResponse.json({message: "Server Error.", error }, {status: 500})
    }
}