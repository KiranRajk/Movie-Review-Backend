import jsonwebToken from 'jsonwebtoken';
import { config } from 'dotenv';

config()

const secretKey = process.env.JWT_SECRET;

export const generateToken = (email) =>{
    return jsonwebToken.sign({data: email}, secretKey, {expiresIn: '1d'});
}