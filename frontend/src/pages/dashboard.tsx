import { useEffect, useState } from "react";
import  Button  from "../component/Button";
import { Plus } from "../component/icon/plus";
import { useNavigate } from "react-router-dom";
import Card from "../component/Card";
import ShopCart from "../component/shopCart";
import axios from "axios";
import { useContent } from "../hooks/useFetch";



export function Dashboard(){
        const navigate=useNavigate()
    
    
    function createShop(){
       navigate('/createshop')
    }
    
    const content=useContent();
    console.log(content);
    console.log(Array.isArray(content))
   
    return <div className="flex flex-col items-center">
    <div className="bg-gray-300 w-full flex justify-around px-3">
        <div className="bg-blue-400 w-16 h-16 md:w-24 md:h-24  rounded-full border-gray-300 cursor-pointer overflow-hidden flex">
            <img src="#" alt="profile" className="w-full h-full objec-cover" />
        </div>
        <div className="flex justify-center items-center">
            
        </div>
        <div className="flex justify-center items-center">
            <Button variant="primary" size="lg" title="open shop "  startIcon={<Plus/>} onClick={createShop}/>
        </div>
    </div>
    <div className="grid w-3/5 sm:grid-cols-2 md:grid-cols-3">
       {content.map(({shopName,image,address})=>(<ShopCart name={shopName} image={`http://localhost:3000/images/${image}`} address={address} />))}
    </div>
    </div>
    
}