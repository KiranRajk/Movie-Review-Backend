import express from 'express';
import { config } from 'dotenv';
import { connectDB } from '../config/db.js';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import userRouter from '../routes/userRoutes.js';
import adminRouter from '../routes/adminRoutes.js';


const app = express();

config()
connectDB()

app.use (cors())
app.use(express.json())
app.use(cookieParser())


app.use('/api/v1/user', userRouter )
app.use('/api/v1/admin', adminRouter)

app.get('/', (req, res)=>{
    res.send('Hello World!');
})

app.listen(process.env.PORT, ()=>{
    console.log(`Example app listening on port ${process.env.PORT}`);
})