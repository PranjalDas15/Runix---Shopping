// import type { NextApiRequest, NextApiResponse } from 'next';
// import UserModel from '@/models/User';
// import dbConnect from '@/lib/dbConnect';
// import firebase from 'firebase/compat/app';
// import { auth } from '@/app/firebase/config';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === 'POST') {
//     try {
//       await dbConnect();

//       const { email, password, phone, address, role } = req.body;
//       if(!email || !password || !phone) {
//         return res.status(400).json({message: "All fields must be filled"});
//       }

//       const existingUser = await UserModel.findOne({ email });
//       if(existingUser){
//         return res.status(400).json({message: "Enail already in use."});
//       }


//       const newUser = new UserModel({
//         email,
//         phone,
//         address: address || [],
//         role: role || 'Customer'
//       });

//       const savedUser = await newUser.save();


//       await createUserWithEmailAndPassword(auth, email, password);
//       return res.status(201).json({message: "User registered Successfully.", user: savedUser});
//     } catch (error: any) {
//       console.log(error)
//       return res.status(500).json({ message: "Server error. Please try again later." });
//     }
   
//   } else {
//     return res.status(405).json({message: "Method not allowed."})
//   }
// }; 

// export default handler;



import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from 'bcrypt'
import { signUpSchema } from "@/schemas/signUpSchema";
import { z } from "zod";


const UserSignUp = async (req: NextApiRequest, res: NextApiResponse) => {
    if( req.method !== 'POST') return res.status(405).json({message: "Method not allowed."});

    try {

        const validatedData = signUpSchema.parse(req.body);
        const {email, phone, password, role} = validatedData;
        
        await dbConnect();

        const existingUser = await UserModel.findOne({email});

        if (existingUser) return res.status(409).json({message: "User already exists with this email"});

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new UserModel({
            email,
            password: hashedPassword,
            phone,
            address: [],
            role
        })

        const savedUser = await user.save();

    res.status(201).json({ message: "User registered successfully.", savedUser })
    } catch (error: any) {
        if (error instanceof z.ZodError) {
            return res.status(400).json({
                message: error.errors.map((err) => err.message).join(", ")
            });
        }
        return res.status(500).json({message: "Server Error."})
    }

}


export default UserSignUp;