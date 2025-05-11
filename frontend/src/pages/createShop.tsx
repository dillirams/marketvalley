
import { SubmitHandler, useForm } from "react-hook-form"
import { Input } from "../component/inputs/inputs"
import { ReactElement, useEffect, useState } from "react";
import { Label } from "../component/label/label";
import  Button  from "../component/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";


type FormInputs={
    file:FileList,
    shopname:string,
    price:Number,
    address:string,
    category:string,
   
}

export function CreateShop(){

    const navigate=useNavigate()
    const [currentLocation,setCurrentLocation]=useState<{latitude:0,longitude:0}>()
    function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(success, error, {
        timeout: 10000,
        enableHighAccuracy: true,
      });
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCurrentLocation({ latitude, longitude });
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    // Use the location data as needed
  }
  function error(err) {
    switch (err.code) {
      case err.PERMISSION_DENIED:
        alert("User denied the request for geolocation.");
        break;
      case err.POSITION_UNAVAILABLE:
        alert("Location information is unavailable.");
        break;
      case err.TIMEOUT:
        alert("The request to get user location timed out.");
        break;
      default:
        alert("An unknown error occurred.");
    }
  }
  useEffect(()=>{
getLocation()
  },[])

    const {register,
         handleSubmit} =useForm<FormInputs>();
        const locationInfo=JSON.stringify(currentLocation)
         const submitInput: SubmitHandler<FormInputs> = async (data) => {
            const formData = new FormData();
            formData.append("file", data.file[0]); // FileList to File
            formData.append("shopname", data.shopname);
            formData.append("address", locationInfo);
            formData.append("category", data.category);
        
            const response = await axios.post("http://localhost:3000/user/shop", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    "token": localStorage.getItem("token") || "",
                },
            });
        
            navigate('/dashboard');
        };
        

    return <div className="bg-blue-300 h-screen w-screen flex justify-center items-center">
    <form onSubmit={handleSubmit(submitInput)}   className=" w-96 bg-white rounded-xl p-2">
        <div className="w-full flex justify-center text-2xl font-bold">Open Shop</div>
        <div className="mt-5">
            <Label text={"Upload Photo"}/>
             <Input register={register} placeholder="Upload file" type="file" name="file"/>
             <Label text={"Shop Name:"}/>
             <Input register={register} placeholder="Enter Shop Name" type="text" name="shopname"/>
             <Label text={"Category:"}/>
             <div className="m-2">
                <select {...register('category')} className="p-3">
                <option value="grocery">grocery</option>
                <option value="bar">bar</option>
                <option value="hardware">hardawre</option>
            </select></div>
             {/* <Label text={"Address"}/>
             <Input register={register} placeholder="Enter Location" type="text" name="address"/> */}
             
           
        </div>
        <div>
            <Button variant="primary" title="Open Shop "  size="special" />
        </div>
     
    </form>
    </div>
}