import type { NextApiRequest, NextApiResponse } from 'next';
import UserModel from '@/models/User';
import dbConnect from '@/lib/dbConnect';
import { verifyIdToken } from '@/lib/firebaseAdmin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const cookie = req.cookies.token;
      if(!cookie){
        return res.status(401).json({message: "No token found."})
      }
      const decodedToken = await verifyIdToken(cookie);
      if (!decodedToken) {
        return res.status(401).json({ message: "Invalid or expired token." });
      }
      await dbConnect();

      const user = await UserModel.findOne({email: decodedToken.email});
      if(!user){
        return res.status(404).json({message: "User not found."});
      }

      const loggedInUser = {
        _id: user._id,
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