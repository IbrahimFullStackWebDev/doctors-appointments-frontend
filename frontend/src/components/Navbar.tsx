import React, { useState } from "react";
import { assets } from "../assets/assets.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { type NavItems } from "../types/index.ts";
import { useAppContext } from "../context/AppContext.tsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { uToken, setUToken } = useAppContext();

  const navitems: NavItems[] = [
    { path: "/", lable: "HOME" },
    { path: "/doctors", lable: "ALL DOCTORS" },
    { path: "/about", lable: "ABOUT" },
    { path: "/contact", lable: "CONTACT" },
  ];

  const userMenuItem: NavItems[] = [
    { path: "/profile", lable: "PROFILE" },
    { path: "/my-appointments", lable: "MY APPOINTMENTS" },
  ];

  return (
    <>
      <nav className="flex flex-row items-center justify-between  py-4 border-b border-gray-500">
        <img src={assets.logo} className="w-45" alt="Logo" />
        <ul className="hidden lg:flex flex-row items-center gap-6 text-gray-700">
          {navitems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              <p className="text-gray-900 font-semibold text-sm">
                {item.lable}
              </p>
              <hr className="w-full border-none h-0.5 bg-gray-500 hidden" />
            </NavLink>
          ))}
        </ul>
        {uToken ? (
          <div className="flex flex-row items-center gap-3 p-2 cursor-pointer realtive group">
            <img
              className="hidden lg:block w-10 rounded-full"
              src={assets.profile_pic}
              alt="profile image"
            />
            <img
              src={assets.dropdown_icon}
              className="hidden lg:block"
              alt="dropdown icon"
            />
            <div className="hidden flex flex-col items-start gap-3 text-gray-700 p-4 bg-gray-100 rounded-lg absolute top-16 right-30 group-hover:flex">
              <p
                className="hover:text-gray-900 transition-all duration-300"
                onClick={() => navigate("/profile")}
              >
                My Profile
              </p>
              <p
                className="hover:text-gray-900 transition-all duration-300"
                onClick={() => navigate("/my-appointments")}
              >
                My Appointments
              </p>
              <p
                className="hover:text-gray-900 transition-all duration-300"
                onClick={() => {
                  setUToken(null);
                  navigate("/");
                  localStorage.removeItem("uToken");
                }}
              >
                Logout
              </p>
            </div>
          </div>
        ) : (
          <button
            type="button"
            className="px-8 py-3 bg-blue-500 text-white rounded-full cursor-pointer hover:bg-blue-700 transition-all duration-300 hidden lg:block"
            onClick={() => navigate("/login")}
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
      </nav>
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
          {uToken &&
            userMenuItem.map((item) => (
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

          <NavLink
            to={"/"}
            onClick={() => {
              setShowMenu((prev) => !prev);
              setUToken(null);
              localStorage.removeItem("uToken");
              localStorage.removeItem("userInfo");
            }}
          >
            <p className="text-gray-700 font-semibold px-8 py-2 rounded-md">
              LOGOUT
            </p>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
