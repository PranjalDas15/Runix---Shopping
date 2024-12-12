// pages/api/verify-phone.ts
import { NextApiRequest, NextApiResponse } from 'next';
import admin from 'firebase-admin';
import { app } from '../../app/firebase/config'

// Initialize Firebase Admin SDK using the config
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "runix-auth-app",
    }),
  });
}

const auth = admin.auth();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { phoneNumber } = req.body;

    try {
      const formattedPhoneNumber = `+91${phoneNumber.trim().replace(/\D/g, '').slice(-10)}`;

      const userRecord = await auth.getUserByPhoneNumber(formattedPhoneNumber);

      res.status(200).json({ message: 'User exists', userRecord });
    } catch (error) {
      res.status(500).json({ error });
    }
  } else {
    res.status(404).json({ message: 'Method not allowed' });
  }
}
