import React, { ReactElement } from "react";

interface ButtonProps {
  title: string;
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg" | "special";
  onClick?: () => void;
  startIcon?:ReactElement,
  endIcon?:ReactElement,
  
}

const buttonVariant = {
  primary: "bg-orange-400 font-sembold",
  secondary: "bg-green-400",
};
const buttonSize = {
  sm: "px-4 py-1 text-base rounded-sm inline block",
  md: "px-5 py-2 text-lg rounded-md",
  lg: "px-6 py-3 text-xl rounded-lg",
  special: "w-full py-3 text-2xl font-semibold rounded-xl",
};

export default function Button(props: ButtonProps) {
  return (
    <button
      onClick={props.onClick}
      className={`flex transition-all ease-in justify-center items-center text-white ${
        buttonVariant[props.variant]
      } ${
        buttonSize[props.size]
      } hover:bg-orange-700 hover: hover:text-white hover:cursor-pointer`}
    >
     {props.startIcon?<div className=" pt-1 pr-1">{props.startIcon}</div>:""} {props.title} {props.endIcon}
    </button>
  );
}
