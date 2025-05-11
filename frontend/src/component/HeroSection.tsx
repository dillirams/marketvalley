import React from "react";
import Button from "./Button";
import photo from "../assets/photo.png";
import { useNavigate } from "react-router-dom";
export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap w-5/6 justify-between bg-amber-50 rounded-2xl p-3  shadow-2xl">
      <div className="flex flex-col md:w-1/2  rounded-xl ">
        <div className="text-[3.5rem] font-bold p-3">
          <p>Smater Marketing</p>
          <span>Bigger</span> <span className="text-orange-400">Impact</span>{" "}
        </div>
        <div className="flex flex-col p-3 m-2 gap-3 text-xl">
          <p className="">
            Find the best item of your choice at the best price. locate the shop
            of your choice in the town.
          </p>
          <div className="flex flex-wrap justify-start gap-3 m-3">
            <Button
              title="Search Item"
              size="md"
              variant="primary"
              onClick={() => navigate("/searchItem")}
            />
            <Button onClick={()=>{
              navigate("/shoplist")
            }} title="Search Shop" size="md" variant="secondary" />
          </div>
        </div>
        <div className="flex flex-col p-3 m-2 gap-3 text-xl">
          <p className="">
            If you are a shop owner or service provider you can open shop or
            list the service
          </p>
          <div className="flex flex-wrap justify-start gap-3 m-3">
            <Button title="Signup" size="special" variant="primary" onClick={()=>{
              navigate('/signup')
            }} />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center md:w-1/2 p-3">
        <img
          src={photo}
          alt="Hero"
          className="max-w-full h-auto max-h-[550px] justify-center md:max-h-[550px] object-contain shadow-2xl rounded-2xl"
        />
      </div>
    </div>
  );
}
