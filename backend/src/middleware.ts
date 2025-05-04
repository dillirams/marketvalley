import jwt from 'jsonwebtoken';
const JWT_SECRET="ajfldakaksfo"
import { Request,Response, NextFunction } from "express";


export function authentication(req:Request,res:Response,next:NextFunction){
    const token=req.headers.token as string;
    const decodedData= jwt.verify(token,JWT_SECRET);
    if(decodedData){
        //@ts-ignore
        req.id=decodedData.id;
        //@ts-ignore
        next();
    }else{
        res.status(400).json({
            message:"something went wrong"
        })
        return
    }
}