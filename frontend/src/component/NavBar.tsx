import React, { useState } from "react";
import NavItem from "./NavItem";
import Button from "./Button";
import Sidebar from "./Sidebar";

export default function NavBar() {
  const [sidebar, setSidebar] = useState(false);
  return (
    <>
      <div
        className={` transition-all ease-in duration-100 ${
          sidebar ? "w-full" : "w-0 overflow-clip"
        } md:hidden `}
      >
        <Sidebar display={sidebar} setdisplay={setSidebar} />
      </div>
      <div className="flex justify-around w-full items-center between:justify-around p-5 md:justify-around md:p-3 md:items-center">
        <div
          className="md:hidden hover:cursor-pointer"
          onClick={() => setSidebar(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="size-10"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </div>
        <div className="flex justify-center items-center">
          <span className="text-3xl font-bold text-orange-400">Market</span>{" "}
          <span className="text-3xl font-bold text-green-400">Valley</span>
        </div>
        <div className="hidden md:block md:flex md:flex-wrap md:justify-center md:gap-2 md:p-2">
          <NavItem navigate="" title="Home" size="lg" variant="primary" />
          <NavItem
            navigate="aboutUs"
            title="About us"
            size="lg"
            variant="primary"
          />
          <NavItem
            navigate="contactUs"
            title="Contact us"
            size="lg"
            variant="primary"
          />
        </div>
        <div className="hidden sm:block">
          <Button title="view your shop" variant="primary" size="lg" />
        </div>
      </div>
    </>
  );
}
