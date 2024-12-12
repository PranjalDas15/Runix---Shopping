import type { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { cookies } from 'next/headers';
import { verifyIdToken } from '@/lib/firebaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const cookie = (await cookies()).get("token");
      if(!cookie){
        return res.status(401).json({message: "No token found."})
      }
      const decodedToken = await verifyIdToken(cookie.value);
      await dbConnect();

      const user = await UserModel.findOne({email: decodedToken.email});
      if(!user){
        return res.status(404).json({message: "User not found."});
      }

      const loggedInUser = {
        email: user.email,
        role: user.role,
        phone: user.phone,
        address: user.address
      }
      return res.status(200).json({ user: loggedInUser });

    } catch (error: any) {
      console.error(error);
      return res.status(500).json({ message: "Server error. Please try again later." });
    }
   
  } else {
    return res.status(405).json({ message: "Method not allowed." });
  }
}; 

export default handler;