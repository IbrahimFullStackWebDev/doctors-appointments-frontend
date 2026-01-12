import React from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-30 flex flex-row items-center justify-between bg-blue-500 rounded-lg p-10 lg:px-12 lg:py-0">
      {/* lsft side */}
      <div className="flex flex-col items-start gap-10">
        <h4 className="text-5xl text-white leading-tight font-medium">
          Book Appointment <br />
          With 100+ Trusted Doctors
        </h4>
        <button
          className="px-10 py-4 bg-white rounded-full text-gray-900 cursor-pointer"
          onClick={() => navigate("/login")}
        >
          Create an account
        </button>
      </div>
      <img
        src={assets.appointment_img}
        className="w-100 hidden lg:block"
        alt=""
      />
    </div>
  );
};

export default Banner;
