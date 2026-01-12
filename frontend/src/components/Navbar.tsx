import React, { useState } from "react";
import { assets } from "../assets/assets.ts";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [uToken, setUToken] = useState<boolean>(false);

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
      <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-30 flex flex-row items-center justify-between  py-4 border-b border-gray-500">
        <img src={assets.logo} className="w-45" alt="Logo" />
        <ul className="hidden lg:flex flex-row items-center gap-6 text-gray-700 font-semibold">
          {navitems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              <p className="text-gray-700 font-semibold">{item.lable}</p>
              <hr className="w-full border-none h-0.5 bg-gray-500 hidden" />
            </NavLink>
          ))}
        </ul>
        {uToken ? (
          <div className="flex flex-row items-center gap-3 p-2 cursor-pointer realtive group">
            <img
              className="w-10 rounded-full"
              src={assets.profile_pic}
              alt="profile image"
            />
            <img src={assets.dropdown_icon} alt="dropdown icon" />
            <div className="hidden flex flex-col items-start gap-3 text-gray-700 p-4 bg-gray-100 rounded-lg absolute top-16 right-30 group-hover:flex">
              <p className="hover:text-gray-900 transition-all duration-300">
                My Profile
              </p>
              <p className="hover:text-gray-900 transition-all duration-300">
                My Appointments
              </p>
              <p className="hover:text-gray-900 transition-all duration-300">
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="px-8 py-3 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-300 hidden lg:block"
            onClick={() => setUToken(true)}
          >
            Create an account
          </button>
        )}

        <img
          onClick={() => setShowMenu((prev) => !prev)}
          src={showMenu ? assets.cross_icon : assets.menu_icon}
          className="w-6 lg:hidden mr-4 cursor-pointer"
          alt="Menu"
        />
      </div>
      <div
        className={`lg:hidden w-full h-screen transition-all duration-500 ${
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
