import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import { config } from 'dotenv';

config();

const secretKey = process.env.JWT_SECRET;

export const verifyToken = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, secretKey);
            req.user = await User.findById(decoded.id).select('-password');
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

export const checkAdmin = (req, res, next ) => {
    if(req.user && req.user.isAdmin) {
        next()
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' })
    }
}