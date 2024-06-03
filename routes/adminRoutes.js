import express from 'express';
import { createMovie, getDashboard, deleteUser } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/addNewMovies', createMovie  )

adminRouter.get('/dashboard', getDashboard);
adminRouter.delete('/deleteUser/:id' , deleteUser)


export default adminRouter