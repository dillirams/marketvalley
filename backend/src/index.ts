
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import { userRouter } from './router';

const app=express();
app.use(express.json());
app.use(cors());
app.use("/images",express.static("uploads/"))
app.use('/user',userRouter)

async function main() {
    await mongoose.connect("mongodb+srv://root:dilli03@cluster0.zuems.mongodb.net/marketvalley")
    app.listen(3000,()=>{
        console.log("the app is listening to port 3000")
    })
}

main();
