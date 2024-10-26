import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <Link to={"/"}>
        <img src={assets.logo} className="max-w-[150px]" alt="logo" />
      </Link>
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
      >
        Выйти
      </button>
    </div>
  );
};

export default Navbar;
