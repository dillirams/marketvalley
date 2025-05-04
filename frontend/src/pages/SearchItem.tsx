import React, { useRef } from "react";
import Card from "../component/Card";
import Advertisment from "../component/Advertisement";
import useDebounce from "../hooks/deBounce";
import NavSecond from "../component/NavSecond";
export default function SearchItem() {
  const search = useRef<any>();

  return (
    <div className="flex w-full h-full flex-col items-center">
      <div className="flex w-full m-4">
        <NavSecond />
      </div>
      <div className="flex w-full sm:w-3/5 ">
        <Advertisment />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 justify-center ">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
