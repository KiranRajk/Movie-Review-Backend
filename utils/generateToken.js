import jsonwebToken from 'jsonwebtoken';
import { config } from 'dotenv';

config()

const secretKey = process.env.JWT_SECRET;

export const generateToken = (user) =>{
    return jsonwebToken.sign({id : user._id, isAdmin: user.isAdmin}, secretKey, {expiresIn: '1d'});
}