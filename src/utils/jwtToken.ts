import jwt from 'jsonwebtoken'

function generateToken(userId: any, role: string) {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET NOT DEFINED.');
    }
    const JWT_SECRET = process.env.JWT_SECRET;

    const token = jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '1d' });
  
    const cookieName = `auth_${role}`;
  
    return { token, cookieName };
  }

  export default generateToken;