import { useEffect, useState } from "react";
import  Button  from "../component/Button";
import { Plus } from "../component/icon/plus";
import { useNavigate, useParams } from "react-router-dom";
import Card from "../component/Card";
import ShopCart from "../component/shopCart";
import axios from "axios";
import { useContent } from "../hooks/useFetch";
import { items } from "../store/atom";



export function ViewItems(){
   const {id}=useParams();
    const content=useContent(`http://localhost:3000/user/viewitems/${id}`,"items")

       const navigate=useNavigate();
       
    function addItems(){
        navigate(`/additems/${id}`)
    }


   
    return <div className="flex flex-col items-center">
    <div className="bg-gray-300 w-full flex justify-around px-3">
        <div className="bg-blue-400 w-16 h-16 md:w-24 md:h-24  rounded-full border-gray-300 cursor-pointer overflow-hidden flex">
            <img src="#" alt="profile" className="w-full h-full objec-cover" />
        </div>
        <div className="flex justify-center items-center">
            
        </div>
        <div className="flex justify-center items-center">
            <Button variant="primary" size="lg" title="Add Items "  startIcon={<Plus/>} onClick={addItems}/>
        </div>
    </div>
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 justify-center">
       {content.map(({name,photo,price, description})=>(<ShopCart name={name} image={`http://localhost:3000/images/${photo}`} address={description} />))}
    </div>
    </div>
    
}