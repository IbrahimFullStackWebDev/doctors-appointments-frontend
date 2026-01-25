import React from "react";
import { useNavigate } from "react-router-dom";
import { type DoctorDataType } from "../types/index";
import { useAppContext } from "../context/AppContext";

const TopDoctors = () => {
  const navigate = useNavigate();
  const { doctors } = useAppContext();
  return (
    <div className="w-full flex flex-col items-center gap-10 my-30">
      <div className="flex flex-col items-center gap-5">
        <h3 className="text-3xl font-medium">Top Doctors to Book</h3>
        <p className="text-gray-700 text-sm">
          Simply browse through our extensive list of trusted doctors.
        </p>
      </div>

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
        {doctors &&
          doctors.slice(0, 10).map((item: DoctorDataType) => (
            <div
              key={item.id}
              className="w-full flex flex-col items-start gap-4 pb-4 border border-gray-300 rounded-lg cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              onClick={() => {
                navigate(`/appointments/${item.id}`);
                scrollTo(0, 0);
              }}
            >
              <img
                src={item.image}
                className="bg-blue-100 rounded-lg object-cover"
                alt="doctor image"
              />
              <div className="flex flex-col items-start gap-2 px-4">
                <div className="flex flex-row items-center gap-2">
                  <div
                    className={`${item.available ? "bg-green-500" : "bg-red-500"} p-1 rounded-full`}
                  ></div>
                  <p
                    className={`${item.available ? "text-green-500" : "text-red-500"} text-sm`}
                  >
                    {item.available ? "Available" : "Unavailable"}
                  </p>
                </div>
                <p className="text-xl">{item.name}</p>
                <p className="text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
      </div>
      <button
        className="bg-blue-100 px-14 py-3 rounded-full cursor-pointer"
        onClick={() => {
          navigate("/doctors");
          scrollTo(0, 0);
        }}
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;
