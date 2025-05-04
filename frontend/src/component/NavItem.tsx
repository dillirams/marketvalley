import React from "react";
import { NavLink, useLocation } from "react-router-dom";

interface navitemProps {
  title: string;
  size: "sm" | "md" | "lg";
  variant: "primary" | "secondary";
  onClick?: () => void;
  navigate?: string;
}

const navItemSize = {
  sm: "px-3 py-1 text-base",
  md: "px-4 py-2 text-lg",
  lg: "px-5 py-3 text-xl",
};
const navVariant = {
  primary: "text-black hover:text-blue-600",
  secondary: "text-white hover:text-semibold",
};
export default function NavItem(props: navitemProps) {
  return (
    <NavLink
      to={`/${props.navigate}`}
      onClick={props.onClick}
      className={({ isActive }) => `
        group flex flex-col items-center justify-center transition-all ease-in
        ${navItemSize[props.size]} ${navVariant[props.variant]}
        ${isActive ? "font-bold text-blue-600" : ""}
        hover:font-bold hover:cursor-pointer
      `}
    >
      {({ isActive }) => (
        <>
          <div>{props.title}</div>
          <div className="flex justify-center items-center w-full h-1 bg-gray-200 rounded">
            <div
              className={`h-1 bg-green-400 rounded transition-all duration-500 ease-in-out ${
                isActive ? "w-full" : "w-0 group-hover:w-full"
              }`}
            ></div>
          </div>
        </>
      )}
    </NavLink>
  );
}
