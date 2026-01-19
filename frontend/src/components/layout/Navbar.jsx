import React from "react";
import ProfileInfoCard from "../Cards/ProfileInfoCard";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"; // <-- put your logo file inside src/assets/

function Navbar() {
  return (
    <div className="h-17 bg-white border border-b border-gray-200/50 backdrop-blur-[2px] px-4 md:px-22 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5">
        {/* Logo instead of text */}
        <Link to={"/dashboard"} className="flex items-center gap-2">
          <img
            src={logo}
            alt="App Logo"
            className="h-18 w-15 object-contain"
          />
          {/* If you want text next to logo, uncomment: */}
          {/* <span className="text-lg md:text-xl font-medium leading-5">Interview Prep AI</span> */}
        </Link>

        <ProfileInfoCard />
      </div>
    </div>
  );
}

export default Navbar;
