import React from "react";
import NavItem from "./NavItem";
import Button from "./Button";

interface sidebardisplay {
  display: boolean;
  setdisplay: (item: boolean) => void;
}
export default function Sidebar(props: sidebardisplay) {
  return (
    <div
      className={` transition-all ease-in duration-500  h-full gap-6 flex flex-col items-center fixed left-0 top-0 opacity-80 bg-black ${
        props.display ? "w-2/3 p-5" : "w-0 overflow-clip"
      }`}
    >
      <div className={`w-full h-1/12 flex justify-end hover:cursor-pointer }`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="white"
          className="size-6"
          onClick={() => props.setdisplay(false)}
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18 18 6M6 6l12 12"
          />
        </svg>
      </div>
      <div className="flex h-11/13 w-fit flex-col gap-8">
        <NavItem navigate="home" title="Home" size="lg" variant="secondary" />
        <NavItem
          navigate="aboutUs"
          title="About us"
          size="lg"
          variant="secondary"
        />
        <NavItem
          navigate="contactUs"
          title="Contact us"
          size="lg"
          variant="secondary"
        />
        <div className="sm:hidden">
          <Button title="view your shop" variant="primary" size="lg" />
        </div>
      </div>
    </div>
  );
}
