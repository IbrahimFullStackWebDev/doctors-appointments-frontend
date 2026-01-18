import React from "react";
import { specialityData } from "../assets/assets";
import { useNavigate, useParams } from "react-router-dom";
import { type DoctorDataType, type SpecialityItem } from "../types/index";
import { useAppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams<{ speciality: string }>();

  const { doctors } = useAppContext();

  const filterdDoctors: DoctorDataType[] = speciality
    ? doctors.filter(
        (item) =>
          item.speciality.toLocaleLowerCase() ===
          speciality.toLocaleLowerCase(),
      )
    : doctors;
  const navigate = useNavigate();
  return (
    <div className="w-ful flex flex-col items-start gap-8 mt-4">
      <p className="text-gray-700">Browse through the doctors specialist.</p>
      <div className="w-full flex flex-col md:flex-row items-start gap-8">
        <div className="w-full md:flex-1 flex flex-col items-start gap-4">
          {specialityData.map((item: SpecialityItem) => (
            <p
              key={item.id}
              className={`px-14 py-2 text-sm text-gray-700 border border-gray-300 rounded-md w-full text-left pl-2 cursor-pointer ${
                speciality === item.speciality ? "bg-blue-100" : ""
              }`}
              onClick={() =>
                speciality === item.speciality
                  ? navigate("/doctors")
                  : navigate("/doctors/" + item.speciality)
              }
            >
              {item.speciality}
            </p>
          ))}
        </div>
        <div className="w-full flex-5 grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6">
          {filterdDoctors.map((item) => (
            <div
              key={item.id}
              className="w-full flex flex-col items-start gap-4 pb-4 border border-gray-300 rounded-lg cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
              onClick={() => navigate("/appointments/" + item.id)}
            >
              <img
                src={item.image}
                className="bg-blue-100 rounded-lg hover:bg-blue-500 transition-all duration-500"
                alt="doctor image"
              />
              <div className="flex flex-col items-start gap-2 px-4">
                <div className="flex flex-row items-center gap-2">
                  {item.available ? (
                    <>
                      <div className="p-1 rounded-full bg-green-500"></div>
                      <p className="text-sm text-gray-500">Available</p>
                    </>
                  ) : (
                    <>
                      <div className="p-1 rounded-full bg-red-500"></div>
                      <p className="text-sm text-gray-500">Unavailable</p>
                    </>
                  )}
                </div>
                <p className="text-xl">{item.name}</p>
                <p className="text-gray-500">{item.speciality}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
