import express from 'express';
import { createMovie, getDashboard, deleteUser } from '../controllers/adminController.js';
import upload from '../middleware/upload-middleware.js';

const adminRouter = express.Router();

adminRouter.post('/addNewMovies', upload.single('image'), createMovie )

adminRouter.get('/dashboard', getDashboard);
adminRouter.delete('/deleteUser/:id' , deleteUser)


export default adminRouter