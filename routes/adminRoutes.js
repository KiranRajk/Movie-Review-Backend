import express from 'express';
import { createMovie, getDashboard, deleteUser } from '../controllers/adminController.js';
import upload from '../middleware/upload-middleware.js';
import { checkAdmin, verifyToken } from '../middleware/authMiddleware.js';

const adminRouter = express.Router();

adminRouter.post('/addNewMovies', verifyToken, checkAdmin,upload.single('image'), createMovie );

adminRouter.get('/dashboard', verifyToken, checkAdmin, getDashboard);
adminRouter.delete('/deleteUser/:id' , verifyToken, checkAdmin, deleteUser);


export default adminRouter