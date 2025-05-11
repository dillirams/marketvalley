import mongoose from 'mongoose'

import { Schema } from 'mongoose'

interface AddressType{
    latitude:number,
    longitude:number
}
const userSchema=new Schema({
    uername:String,
    email:String,
    password:String,
    profile:String,
    phonenumber:Number,
    address:String,
    document:String,
   

})

const shopSchema=new Schema({
    shopName:String,
    address:String,
    latitude:Number,
    longitude:Number,
    description:String,
    image:String,
    category:String,
    userId:{type:mongoose.Schema.ObjectId, ref:"user"}
    

})

const productSchema=new Schema({
    name:String,
    photo:String,
    price:Number,
    details:String,
    shopId:{type:mongoose.Schema.ObjectId, ref:"shop"}
   
    
})

const reviewSchema=new Schema({
    name:String,
    review:String,
    date:Date,
    productId:{type:mongoose.Schema.ObjectId, ref:"product"}
})


export const userModel=mongoose.model("user",userSchema);
export const shopModel=mongoose.model("shop",shopSchema);
export const productModel=mongoose.model("product",productSchema);
export const reviwModel=mongoose.model("review",reviewSchema)
