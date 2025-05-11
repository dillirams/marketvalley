import React, { useEffect, useRef, useState } from "react";
import Card from "../component/Card";
import Advertisment from "../component/Advertisement";
import useDebounce from "../hooks/deBounce";
import NavSecond from "../component/NavSecond";
import { useRecoilState } from "recoil";
import { locationatom, viewitematom } from "../store/atom";
import axios from "axios";
export default function SearchItem() {
  const search = useRef<any>();
  const [currentLocation,setCurrentLocation]=useRecoilState(locationatom)
  const [shops,setShops]=useState([])
  const [viewitem,setviewitem]=useRecoilState(viewitematom)
  async function fetchData() {
    const res=await axios.post("http://localhost:3000/user/searchItem",{currentLocation,viewitem})
    setShops(res.data.shops);
  }
  useEffect(()=>{
    fetchData()
  },[viewitem])
  return (
    <div className="flex w-full h-full flex-col items-center">
      <div className="flex w-full m-4">
        <NavSecond palceholder="seach items..." />
      </div>
      <div className="flex w-full sm:w-3/5 ">
        <Advertisment />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 justify-center ">
        {shops?.map((shop)=>( <Card id={shop._id} image={`http://localhost:3000/images/${shop.image}`}  name={shop.shopName} item={`${viewitem}`} />))}
       
       
      </div>
    </div>
  );
}
