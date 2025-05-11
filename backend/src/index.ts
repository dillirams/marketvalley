
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import dotenv from 'dotenv'
dotenv.config();
import { userRouter } from './router';

const app=express();
app.use(express.json());
app.use(cors());
app.use("/images",express.static("uploads/"))
app.use('/user',userRouter)

async function main() {
    if(!process.env.MONGODB_URL){
         throw new Error("MOGODB_URL is not defined in the environment variables");
    }
    await mongoose.connect(process.env.MONGODB_URL )
    app.listen(3000,()=>{
        console.log("the app is listening to port 3000")
    })
}

main();
