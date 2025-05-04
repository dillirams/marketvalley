import React from "react";
import Button from "../component/Button";
import NavBar from "../component/NavBar";
import NavItem from "../component/NavItem";
import HeroSection from "../component/HeroSection";
import Card from "../component/Card";

export default function Home() {
  return (
    <div>
      <div className="flex items-center flex-col h-screen gap-3">
        <NavBar />
        <HeroSection />
      </div>
     
    </div>
  );
}
