import express from 'express';
import { createMovie } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.post('/addNewMovies', createMovie  )

export default adminRouter