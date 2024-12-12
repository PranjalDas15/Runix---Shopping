import { NextApiRequest, NextApiResponse } from "next";
import jwt from'jsonwebtoken'

interface JwtPayloadWithRole extends jwt.JwtPayload {
    userId: any;
    role: string;
}

interface ExtendedRequest extends NextApiRequest {
    user?: {
        userId: string;
        role: string;
    };
}

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET NOT DEFINED.")
}
const JWT_SECRET = process.env.JWT_SECRET;

export function adminAuth(handler: Function) {
    return async (req:ExtendedRequest, res:NextApiResponse) => {
        const token = req.cookies.auth_Admin;

        if(!token) return res.status(401).json({message: "Unauthorized access."});
    

        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayloadWithRole;
            req.user = {
                userId: decodedToken.userId as string,
                role: decodedToken.role as string
            };

            return handler(req, res);
        } catch (error:any) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized access: Token has expired." });
            }
            return res.status(500).json({message: "Server Error."})
        }
    }
}

export function customerAuth(handler: Function) {
    return async (req:ExtendedRequest, res:NextApiResponse) => {
        const token = req.cookies.auth_Customer;

        if(!token) return res.status(401).json({message: "Unauthorized access."});
        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayloadWithRole;
            req.user = {
                userId: decodedToken.userId as string,
                role: decodedToken.role as string
            };

            return handler(req, res);
        } catch (error:any) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized access: Token has expired." });
            }
            return res.status(500).json({message: "Server Error."})
        }
    }
}

export function sellerAuth(handler: Function) {
    return async (req:ExtendedRequest, res:NextApiResponse) => {
        const token = req.cookies.auth_Seller;

        if(!token) return res.status(401).json({message: "Unauthorized access."});

        try {
            const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayloadWithRole;
            req.user = {
                userId: decodedToken.userId as string,
                role: decodedToken.role as string
            };

            return handler(req, res);
        } catch (error:any) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Unauthorized access: Token has expired." });
            }
            return res.status(500).json({message: "Server Error."})
        }
    }
}