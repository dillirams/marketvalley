import axios from "axios";
import { useEffect, useState } from "react";

export function useContent(){
    const[content, setContent]=useState([]);
async function  getContent() {
    const response= await axios.get('http://localhost:3000/user/shop',{
        headers:{
            "token":localStorage.getItem("token")
        }
    })
    setContent(response.data.shop)
}
    

    useEffect(()=>{
        getContent()
    },[])

    return content
}