import { NextApiRequest, NextApiResponse } from "next";

const SellerSignOut = async(req: NextApiRequest, res: NextApiResponse)=> {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {

    if(!req.cookies.auth_Seller) return res.status(400).json({message: "No active session found."})
    res.setHeader('Set-Cookie', `auth_Seller=; HttpOnly; Path=/; Max-Age=0`);

    res.status(200).json({ message: 'Seller logout successful.' });
  } catch (error) {
    return res.status(500).json({ message: "Server Error." });
  }
}

export default SellerSignOut;