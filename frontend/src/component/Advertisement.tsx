import React from "react";
import Button from "./Button";
import perfume from "../assets/perfume.jpg";
interface adProps {
  name: string;
  image?: string;
  text: string;
}

export default function Advertisement() {
  return (
    <div className="w-full p-5 rounded-2xl bg-green-400 flex flex-wrap justify-between sm:p-6 m-5 shadow-2xl md:flex">
      <div className="flex flex-col text-white gap-3">
        <p className="font-bold text-4xl">Norling Center</p>
        <p className="font-semibold text-lg">
          You favourite shopping center is now online
        </p>
        <div>
          <Button title="explore shop" variant="primary" size="lg" />
        </div>
      </div>
      <div className="grid grid-cols-2 m-3 gap-3">
        <img src={perfume} alt="" className="max-h-30 rounded-2xl" />
        <img src={perfume} alt="" className="max-h-30 rounded-2xl" />
      </div>
    </div>
  );
}
