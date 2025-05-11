import React, { ReactElement } from "react";
import earbud from "../assets/earbud.avif";
import Star from "./Star";
import Button from "./Button";
interface cardProp {
  image: string;
  name: string;
  rating?: number;
  reviews?: number,
  address:string,
  onClick?:()=>void
}
export default function ShopCart(props: cardProp) {
  return (
    <div className="flex flex-col max-w-100 white rounded-2xl shadow-2xl m-2">
      <div className="flex justify-center items-center transition-all ease-in duration-250 max-h-64 max-w-64 p-3 hover:scale-107">
        <img className="max-h-64 max-w-64 rounded-xl" src={props.image} alt="" />
      </div>
      <div className="flex flex-wrap flex-col gap-2 items-start px-5 py-4">
        <p className="flex flex-wrap text-2xl font-bold">{props.name}</p>
        <div className="flex items-center gap-3">
          
          <div className="flex gap-1">
            <Star />
            <Star />
            <Star />
            <Star />
            <Star />
          </div>
          <div className="text-gray-500">5 reviews</div>
        </div>
        <div className="flex font-semibold">{props.address}</div>
        <Button variant="primary" size="md" title="visit shop" onClick={props.onClick}/>
      </div>
    </div>
  );
}
