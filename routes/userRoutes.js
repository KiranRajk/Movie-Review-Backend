import express from 'express';
import { MovieData, MovieDataById, addReview, signIn, signUp } from '../controllers/userController.js';
import { verifyToken } from '../middleware/authMiddleware.js' 

const userRouter = express.Router();

// userRouter.post('/signUp', signUp)
// userRouter.post('/signIn', signIn)

userRouter.get('/getMovieData' , verifyToken, MovieData)
userRouter.get('/getMovieById', verifyToken,MovieDataById)

userRouter.post('/addReview', verifyToken, addReview)


export default userRouter;