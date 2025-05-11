import React, { useRef } from "react";
import useDebounce from "../hooks/deBounce";
import LocationPicker from "./Map";
import { useRecoilState, useSetRecoilState } from "recoil";
import { items, locationatom, viewitematom } from "../store/atom";
import { StaticInput } from "./inputs/staticInput";
import { useLocation } from "react-router-dom";
export default function NavSecond(props:{palceholder:string}) {
  //@ts-ignore
  const search = useRef<any>();
  const currentpage= useLocation()
 const setviewitem=useSetRecoilState(viewitematom)
  const [itemsList,setItemslist]=useRecoilState(items);
  function fetchShopItem() {
  
    setItemslist(search.current.value)
  }
  function fetchSearchItem() {
    setviewitem(search.current.value)
  }
  const deBouncedfn1 = useDebounce(fetchSearchItem);
  const deBouncefn2=useDebounce(fetchShopItem)
  return (
    <div className="flex flex-wrap gap-5 justify-around w-full items-center between:justify-around p-5 md:justify-around md:p-3 md:items-center">
      <div className="flex justify-center items-center">
        <span className="text-3xl font-bold text-orange-400">Market</span>{" "}
        <span className="text-3xl font-bold text-green-400">Valley</span>
      </div>
      <div>
        <LocationPicker />
      </div>
      <div className="">
      <StaticInput placeholder={props.palceholder} Onchange={currentpage.pathname=="/searchItem"?deBouncedfn1:deBouncefn2} reference={search}/>
      </div>
    </div>
  );
}
