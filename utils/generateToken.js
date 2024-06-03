import jsonwebToken from 'jsonwebtoken';
import { config } from 'dotenv';

config()

const secretKey = process.env.JWT_SECRET;

export const generateToken = (userId) =>{
    return jsonwebToken.sign({id: userId}, secretKey, {expiresIn: '1d'});
}