
import { Router } from "express";
import zod, { string } from 'zod'
import { productModel, shopModel, userModel } from "./db";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { authentication } from "./middleware";
const JWT_SECRET="ajfldakaksfo"
import multer from "multer";
import { getDistanceInMeters } from "./util";

export const userRouter=Router();


const requestBody=zod.object({
    username:string().min(4).max(8),
    email:string().email(),
    password:string().min(4)

})

userRouter.post('/signup', async(req,res)=>{

    const {username, email, password}=req.body
    const inputValidation=requestBody.safeParse(req.body);
    if(!inputValidation.success){
        res.status(400).json({
            message:"invalid input format",
            error:inputValidation.error
            
        })
        return
    }
    const user=await userModel.findOne({
        uername:username
    })
    if(user){
        res.status(400).json({
            message:"user already exsist"
        })
        return
    }
    const hashedPassword=await bcrypt.hash(password,5)
    try{
        await userModel.create({
            uername:username,
            email:email,
            password:hashedPassword
        })
        res.status(200).json({
            message:"you signed up successfully"
        })
    }catch(e){
        res.status(400).json({
            message:"something went wrong"
        })
    }
})


type SigninType=zod.infer<typeof requestBody>
userRouter.post('/signin',async(req,res)=>{
    const {username,email,password}:SigninType=req.body;
    const user=await userModel.findOne({
        uername:username
        
    })
    if(!user){
        res.status(400).json({
            message:"user do not exist"
        })
        return
    }
    try{
        const token=jwt.sign({
            id:user._id
        },JWT_SECRET)
        res.status(200).json({
            message:"you successfully signed in",
            token:token
        })
    }catch(e){
        res.status(400).json({
            message:"something went wrong"
        })
    }

})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(file);
    return cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now();
     return cb(null,  file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })



userRouter.post("/shop",authentication, upload.single('file'), async(req,res)=>{
  console.log(req.body);
    const {shopname,address,description,category}=req.body;
    let newadress=JSON.parse(address);
     const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${newadress.latitude}&lon=${newadress.longitude}`
      );
       const data = await response.json();
    const file=req.file
    
    //@ts-ignore
    const userId=req.id;
    const user=await userModel.findOne({
        _id:userId
    })
    if(!user){
        res.status(400).json({
            message:"please login"
        })
        return
    }
    try{
        await shopModel.create({
            shopName:shopname,
            address:data.display_name,
            latitude:newadress.latitude,
            longitude:newadress.longitude,
            description:description,
            image:file?.originalname,
            category:category,
            userId:userId
        })
        res.status(200).json({
            message:"you successfully opned the shop"
        })
    }catch(e){
        console.log(e);
        res.status(400).json({
            message:"something went wrong"
        })
        return
    }

})


userRouter.get('/shop',authentication,  async(req,res)=>{
    try{
        const shop=await shopModel.find({

        })
        res.status(200).json({
            shop:shop
        })
    }catch(e){
        res.status(400).json({
            message:"something went wrong"
        })
    }
    
})

userRouter.post("/additems/:id",authentication, upload.single('file'), async(req,res)=>{
    const shopId=req.params.id;
    const itemInfo=req.body;
    const image=req.file;
    
    try{
        await productModel.create({
           name:itemInfo.name,
           photo:image?.originalname,
           price:itemInfo.price,
           details:itemInfo.description,
           shopId:shopId
        })
        res.status(200).json({
            message:"item added successfully"
        })
        
    }catch(e){
        
        res.status(400).json({
            message:"something went wrong",

        })
    }
})

userRouter.get("/viewitems/:id", async(req,res)=>{
    const shopId=req.params.id;
    
    try{
       const items= await productModel.find({
           shopId:shopId
        })
        console.log(items);
        res.status(200).json({
            message:"item fetched successfully",
            items:items
        })
    }catch(e){
        console.log(e);
        res.status(400).json({
        
            message:"something went wrong"
        })
    }
})

userRouter.post("/searchItem",async function (req,res) {
    const {currentLocation,viewitem}=req.body;
    try {
       let availableProduct = await productModel.find({
  name: { $regex: viewitem, $options: 'i' } // 'i' for case-insensitive
});

        let shops=[]
        for (const item of availableProduct) {
            let shop= await shopModel.findOne({
                _id:item.shopId
            })
            shops.push(shop)
        }
        let newShop=[]
        for (const shop of shops) {
            //@ts-ignore
            let distance= getDistanceInMeters(shop?.latitude,shop?.longitude,currentLocation.latitude,currentLocation.longitude)
            console.log(distance);
            if (distance<102) {
                newShop.push(shop)
            }
        }
        console.log(newShop);
        res.status(200).json({
            shops:newShop,
            
        })
    } catch (error) {
        console.log(error);
        
    }
})
