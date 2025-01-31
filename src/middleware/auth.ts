import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';  
import { ExtendedRequest } from '@/types/ExtendedRequest';

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET NOT DEFINED.");
}
const JWT_SECRET = process.env.JWT_SECRET;

interface JwtPayloadWithRole extends jwt.JwtPayload {
  userId: any;
  role: string;
}

export function adminAuth(handler: Function) {
  return async (req: Request) => { 
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_Admin'); 
    console.log("AdminToken: ", token)

    if (!token) {
      return NextResponse.json({ message: "Unauthorized access." }, { status: 401 });
    }

    try {
      const decodedToken = jwt.verify(token.value.toString(), JWT_SECRET) as JwtPayloadWithRole;
      (req as ExtendedRequest).user = {
        userId: decodedToken.userId as string,
        role: decodedToken.role as string,
      };

      return handler(req);
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return NextResponse.json({ message: "Unauthorized access: Token has expired." }, { status: 400 });
      }
      return NextResponse.json({ message: "Server Error." }, { status: 500 });
    }
  };
}

export function customerAuth(handler: Function) {
  return async (req: Request) => { 
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_Customer'); 
    if (!token) {
      return NextResponse.json({ message: "Unauthorized access." }, { status: 401 });
    }

    try {
      const decodedToken = jwt.verify(token.value.toString(), JWT_SECRET) as JwtPayloadWithRole;
      (req as ExtendedRequest).user = {
        userId: decodedToken.userId as string,
        role: decodedToken.role as string,
      };

      const response = await handler(req); 
      if (!response) {
        return NextResponse.json({ message: "Handler did not return a valid response." }, { status: 500 });
      }

      return response;
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return NextResponse.json({ message: "Unauthorized access: Token has expired." }, { status: 400 });
      }
      return NextResponse.json({ message: "Server Error." }, { status: 500 });
    }
  };
}

export function sellerAuth(handler: Function) {
  return async (req: Request) => { 
    const cookieStore = await cookies(); 
    const token = cookieStore.get('auth_Seller'); 

    if (!token) {
      return NextResponse.json({ message: "Unauthorized access." }, { status: 401 });
    }

    try {
      const decodedToken = jwt.verify(token.value.toString(), JWT_SECRET) as JwtPayloadWithRole;
      (req as ExtendedRequest).user = {
        userId: decodedToken.userId as string,
        role: decodedToken.role as string,
      };

      return handler(req); // Proceed with handler
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        return NextResponse.json({ message: "Unauthorized access: Token has expired." }, { status: 400 });
      }
      return NextResponse.json({ message: "Server Error." }, { status: 500 });
    }
  };
}
