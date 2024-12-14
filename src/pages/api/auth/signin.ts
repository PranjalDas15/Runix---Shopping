
import dbConnect from '@/lib/dbConnect';
import UserModel from '@/models/User';
import { signInSchema } from '@/schemas/signInSchema';
import generateToken from '@/utils/jwtToken';
import bcrypt from 'bcrypt'
import { NextApiRequest, NextApiResponse } from 'next';


const UserSignIn = async (req: NextApiRequest, res: NextApiResponse )=> {
    if( req.method !== 'POST') return res.status(405).json({message: "Method not allowed."});

    try {

        const validatedData = signInSchema.parse(req.body);
        const { email, password } = validatedData;
        
        await dbConnect();

        const isUser = await UserModel.findOne({email});

        if(!isUser) return res.status(404).json({message: "User not found."});

        const decodedPassword = await bcrypt.compare(password, isUser.password);
        if(!decodedPassword) return res.status(401).json({message: "Please enter correct password."});

        const { cookieName, token } = generateToken(isUser._id, isUser.role);

        res.setHeader('Set-Cookie', `${cookieName}=${token}; HttpOnly; Path=/; Max-Age=86400`);
        const user = {
            id: isUser._id,
            email: isUser.email,
            phone: isUser.phone,
            address: isUser.address,
            role: isUser.role,
            wishlist: isUser.wishlist,
            cart: isUser.cart
        }
        res.status(200).json({message: "User Logged in successfully.", user})


    }
    catch(error){
        return res.status(500).json({message: "Server Error."})
    }
}


export default UserSignIn;