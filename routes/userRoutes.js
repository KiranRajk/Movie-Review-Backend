import express from 'express';
import { MovieData, MovieDataById, signIn, signUp } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post('/signUp', signUp)
userRouter.post('/signIn', signIn)

userRouter.get('/getMovieData' , MovieData)
userRouter.get('/getMovieById/:id', MovieDataById)

userRouter.post('/addReview')

// userRouter.get('/getMovieData', getMovieData)


export default userRouter;