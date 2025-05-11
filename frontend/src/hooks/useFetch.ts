import axios from "axios";
import { useEffect, useState } from "react";

export function useContent(url:string,resType:string){
    const[content, setContent]=useState([]);
async function  getContent() {
    const response= await axios.get(url,{
        headers:{
            "token":localStorage.getItem("token")
        }
    })
    setContent(response.data[resType])
}
    

    useEffect(()=>{
        getContent()
    },[])

    return content
}