import { useState } from "react";
import { assets } from "../assets/assets.ts";
import { NavLink, useNavigate } from "react-router-dom";
import { type NavItems } from "../types/index.ts";
import { useAppContext } from "../context/AppContext.tsx";
import { toast } from "react-toastify";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { uToken, setUToken, userInfo, setUserInfo } = useAppContext();

  const navitems: NavItems[] = [
    { path: "/", label: "HOME" },
    { path: "/doctors", label: "ALL DOCTORS" },
    { path: "/about", label: "ABOUT" },
    { path: "/contact", label: "CONTACT" },
  ];

  const userMenuItem: NavItems[] = [
    { path: "/my-profile", label: "My Profile" },
    { path: "/my-appointments", label: "My Appointments" },
  ];

  return (
    <>
      <nav className="flex flex-row items-center justify-between  py-4 border-b border-gray-500">
        <div className="flex flex-row items-center gap-6">
          <img src={assets.logo} className="w-45" alt="Logo" />
          <a
            className="lg:hidden border py-1 px-2 text-sm rounded-full border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
            href="https://doctors-appointments-admin-8v9p.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Admin
          </a>
        </div>

        <ul className="hidden lg:flex flex-row items-center gap-6 text-gray-700">
          {navitems.map((item, index) => (
            <NavLink key={index} to={item.path}>
              <p className="text-gray-900 font-semibold text-sm">
                {item.label}
              </p>
              <hr className="w-full border-none h-0.5 bg-gray-500 hidden" />
            </NavLink>
          ))}
          <a
            className="border py-1 px-2 text-sm rounded-full border-blue-500 hover:bg-blue-500 hover:text-white transition-all duration-300"
            href="https://doctors-appointments-admin-8v9p.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            Admin
          </a>
        </ul>

        {uToken ? (
          <div className="flex flex-row items-center gap-3 px-4 cursor-pointer relative group">
            <img
              className="hidden lg:block w-10 rounded-full"
              src={userInfo?.image || assets.upload_area}
              alt="profile image"
            />
            <img
              src={assets.dropdown_icon}
              className="hidden lg:block"
              alt="dropdown icon"
            />
            <div className="w-[200px] hidden z-20 flex flex-col items-start gap-3 text-gray-500 font-medium p-4 bg-gray-50 rounded-lg absolute top-10 right-0 group-hover:flex">
              {userMenuItem.map((item, index) => (
                <p
                  key={index}
                  className="hover:text-gray-900 transition-all duration-300"
                  onClick={() => navigate(item.path)}
                >
                  {item.label}
                </p>
              ))}

              <p
                className="hover:text-gray-900 transition-all duration-300"
                onClick={() => {
                  navigate("/");
                  setUToken(null);
                  setUserInfo(null);
                  localStorage.removeItem("uToken");
                  localStorage.removeItem("userInfo");
                  setShowMenu(false);
                  toast.success("Logged out successfully");
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
                Logout
              </p>
            </NavLink>
          )}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
