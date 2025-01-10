import { NextApiRequest, NextApiResponse } from "next";

const AdminSignOut = async(req: NextApiRequest, res: NextApiResponse)=> {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  try {
    if(!req.cookies.auth_Admin) return res.status(400).json({message: "No active session found."})
      res.setHeader('Set-Cookie', `auth_Admin=; HttpOnly; Path=/; Max-Age=0`);

      res.status(200).json({ message: 'Admin logout successful.' });
  } catch (error:any) {
    return res.status(500).json({ message: "Server Error.", error });
  }
}

export default AdminSignOut;