import React from "react";
import { doctors } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { type Doctor } from "../types/doctor";

const TopDoctors = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex flex-col items-center gap-10 my-30">
      <div className="flex flex-col items-center gap-5">
        <h3 className="text-3xl font-medium">Top Doctors to Book</h3>
        <p className="text-gray-700 text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
        {doctors.slice(0, 10).map((item: Doctor) => (
          <div
            key={item._id}
            className="w-full flex flex-col items-start gap-4 pb-4 border border-gray-300 rounded-lg cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            onClick={() => navigate("/doctors/" + item.speciality)}
          >
            <img
              src={item.image}
              className="bg-blue-300 rounded-lg"
              alt="doctor image"
            />
            <div className="flex flex-col items-start gap-2 px-4">
              <div className="flex flex-row items-center gap-2">
                <div className="p-1 rounded-full bg-green-500"></div>
                <p className="text-sm text-gray-500">Available</p>
              </div>
              <p className="text-xl">{item.name}</p>
              <p className="text-gray-500">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button
        className="bg-blue-100 px-14 py-3 rounded-full cursor-pointer"
        onClick={() => navigate("/doctors")}
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
