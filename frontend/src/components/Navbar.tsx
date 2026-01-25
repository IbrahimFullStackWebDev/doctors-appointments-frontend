import { useState } from "react";
import { assets } from "../assets/assets.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { type NavItems } from "../types/index.ts";
import { useAppContext } from "../context/AppContext.tsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { uToken, setUToken, userInfo } = useAppContext();

  const navitems: NavItems[] = [
    { path: "/", label: "HOME" },
    { path: "/doctors", label: "ALL DOCTORS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  const userMenuItem: NavItems[] = [
    { path: "/profile", label: "PROFILE" },
    { path: "/my-appointments", label: "MY APPOINTMENTS" },
  ];

  return (
    <>
      <nav className="flex flex-row items-center justify-between  py-4 border-b border-gray-500">
        <img src={assets.logo} className="w-45" alt="Logo" />
        <ul className="hidden lg:flex flex-row items-center gap-6 text-gray-700">
          {navitems.map((item) => (
            <NavLink key={item.path} to={item.path}>
              <p className="text-gray-900 font-semibold text-sm">
                {item.label}
              </p>
              <hr className="w-full border-none h-0.5 bg-gray-500 hidden" />
            </NavLink>
          ))}
        </ul>
        {uToken ? (
          <div className="flex flex-row items-center gap-3 p-2 cursor-pointer relative group">
            <img
              className="hidden lg:block w-10 rounded-full"
              src={userInfo.image || assets.upload_area}
              alt="profile image"
            />
            <img
              src={assets.dropdown_icon}
              className="hidden lg:block"
              alt="dropdown icon"
            />
            <div className="w-[200px] hidden z-20 flex flex-col items-start gap-3 text-gray-500 font-medium p-4 bg-gray-50 rounded-lg absolute top-12 right-0 group-hover:flex">
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
                  localStorage.removeItem("userInfo");
                  setShowMenu(false);
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
                {item.label}
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
                  {item.label}
                </p>
              </NavLink>
            ))}
          {uToken && (
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
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
