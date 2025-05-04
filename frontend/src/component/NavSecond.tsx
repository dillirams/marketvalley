import React, { useRef } from "react";
import useDebounce from "../hooks/deBounce";
import LocationPicker from "./Map";
export default function NavSecond() {
  //@ts-ignore
  const search = useRef<any>();
  function fetchSearchItem() {
    console.log("items fectched for " + search.current.value);
  }
  const deBouncedfn = useDebounce(fetchSearchItem);
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
        <input
          type="text"
          ref={search}
          onChange={deBouncedfn}
          className="px-3 py-2 w-50 sm:w-100 flex items-center rounded-xl border-1"
          placeholder="search items.."
        />
      </div>
    </div>
  );
}
