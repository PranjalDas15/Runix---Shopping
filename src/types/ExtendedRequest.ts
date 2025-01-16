import { NextApiRequest } from "next";

export interface ExtendedRequest extends Request {
    user?: {
        userId: string;
        role: string;
    };
}