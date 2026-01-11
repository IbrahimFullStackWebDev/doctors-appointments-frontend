import React, { useState } from "react";
import { assets } from "../assets/assets.ts";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);

  interface NavItems {
    path: string;
    lable: string;
  }
  const navitems: NavItems[] = [
    { path: "/", lable: "HOME" },
    { path: "/doctors", lable: "ALL DOCTORS" },
    { path: "/about", lable: "ABOUT" },
    { path: "/contact", lable: "CONTACT" },
  ];

  return (
    <>
      <div className="mx-4 lg:mx-14 flex flex-row items-center justify-between lg:px-6 py-4 border-b border-gray-500">
        <img src={assets.logo} className="w-45" alt="Logo" />
        <ul className="hidden md:flex flex-row items-center gap-6 text-gray-700 font-semibold">
          {navitems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              <p className="text-gray-700 font-semibold">{item.lable}</p>
              <hr className="w-full border-none h-0.5 bg-gray-500 hidden" />
            </NavLink>
          ))}
        </ul>
        <button
          type="button"
          className="px-8 py-3 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-300 hidden md:block"
        >
          Create an account
        </button>
        <img
          onClick={() => setShowMenu((prev) => !prev)}
          src={showMenu ? assets.cross_icon : assets.menu_icon}
          className="w-6 md:hidden mr-4 cursor-pointer"
          alt="Menu"
        />
      </div>
      <div
        className={`md:hidden w-full h-screen transition-all duration-500 ${
          showMenu ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col items-center mt-10 gap-6 text-gray-700 font-semibold">
          {navitems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={"group"}
              onClick={() => setShowMenu((prev) => !prev)}
            >
              <p className="text-gray-700 font-semibold group-[.active]:bg-blue-500 group-[.active]:text-white px-8 py-2 rounded-md">
                {item.lable}
              </p>
            </NavLink>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
