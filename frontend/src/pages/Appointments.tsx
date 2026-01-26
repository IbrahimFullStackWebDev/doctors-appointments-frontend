import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import {
  type BookAppointmentsType,
  type DoctorDataType,
  type ResponseType,
  type Slots,
} from "../types/index";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppContext } from "../context/AppContext";

const Appointments = () => {
  const { docId } = useParams<{ docId: string }>();
  const { backendUrl, uToken, doctors } = useAppContext();

  const doctorInfo: DoctorDataType | undefined = doctors.find(
    (item) => item.id.toString() === docId,
  );
  const [docSlots, setDocSlots] = useState<Slots[][]>([]);
  const [slotDateIndex, setSlotDateIndex] = useState<number>(0);
  const [slotTimeIndex, setSlotTimeIndex] = useState<number>(0);
  const navigate = useNavigate();

  const filterdDoctors: DoctorDataType[] =
    (docId &&
      doctors.filter(
        (item) =>
          item.speciality.toLocaleLowerCase() ===
            doctorInfo?.speciality.toLocaleLowerCase() &&
          item.id.toString() !== docId,
      )) ||
    [];
  const daysOfWeek: string[] = [
    "SUN",
    "MON",
    "TUE",
    "WED",
    "THU",
    "FRI",
    "SAT",
  ];

  useEffect(() => {
    const getSlots = () => {
      const today: Date = new Date();
      const allSolts: Slots[][] = [];

      for (let index: number = 0; index < 7; index++) {
        const currentDate: Date = new Date(today);
        currentDate.setDate(today.getDate() + index);

        const endTime: Date = new Date(today);
        endTime.setDate(today.getDate() + index);
        endTime.setHours(22, 0, 0, 0);

        if (currentDate.getDate() === today.getDate()) {
          currentDate.setHours(
            currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10,
          );
          currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
          currentDate.setSeconds(0, 0);
        } else {
          currentDate.setHours(10, 0, 0, 0);
          currentDate.setMinutes(0, 0, 0);
        }

        const slotsTime: Slots[] = [];

        while (endTime > currentDate) {
          slotsTime.push({
            datetime: new Date(currentDate),
          });
          currentDate.setMinutes(currentDate.getMinutes() + 30);
          currentDate.setSeconds(0, 0);
        }
        allSolts.push(slotsTime);
      }
      setDocSlots(allSolts);
    };
    if (doctorInfo) {
      getSlots();
    }
  }, [docId, doctors, doctorInfo]);

  const bookAppointment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!uToken) {
      toast.warning("Please login to book an appointment");
      return navigate("/login");
    }
    const bookedAppointmentInfo: BookAppointmentsType = {
      doctorId: Number(doctorInfo?.id) as number,
      slotDate: docSlots[slotDateIndex][slotTimeIndex].datetime
        .toISOString()
        .split("T")[0],
      slotTime: docSlots[slotDateIndex][slotTimeIndex].datetime
        .toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .split("T")[0],
      amount: doctorInfo?.fees as number,
    };
    try {
      const { data } = await axios.post<ResponseType>(
        `${backendUrl}/api/user/book-appointment`,
        bookedAppointmentInfo,
        { headers: { uToken: uToken } },
      );
      if (data.success) {
        toast.success(data.message);
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      console.log(error);
    }
  };

  return docId ? (
    <div className="w-full flex flex-col items-center gap-8 mt-10">
      <div className="w-full flex flex-col md:flex-row items-center gap-4">
        <img
          src={doctorInfo?.image}
          className="w-75 rounded-lg bg-blue-500"
          alt="doctor image"
        />
        <div className="flex flex-col gap-4 items-start border border-gray-300 rounded-lg py-10 px-8">
          <div className="flex flex-row gap-2 items-center">
            <p className="text-3xl font-medium">{doctorInfo?.name}</p>
            <img
              className="w-6"
              src={assets.verified_icon}
              alt="verified icon"
            />
          </div>
          <div className="flex flex-row items-start gap-2 text-lg text-gray-700 mt-[-10px]">
            <p>{doctorInfo?.degree} - </p>
            <p>{doctorInfo?.speciality}</p>
            <p className="px-4 py-1 border border-gray-200 rounded-full text-sm">
              {doctorInfo?.experience}
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <div className="flex flex-row items-center gap-2">
              <p className="text-sm">About</p>
              <img src={assets.info_icon} className="w-4" alt="Info icon" />
            </div>
            <p className="text-sm text-gray-700">{doctorInfo?.about}</p>
          </div>
          <p className="text-gray-700 font-semibold mt-2">
            Appointment fee: <span>{doctorInfo?.fees}</span>
          </p>
        </div>
      </div>
      <div className="w-full flex flex-row items-start gap-4">
        <div className="xl:w-1/4 flex-shrink-0"></div>
        <form
          onSubmit={(e) => bookAppointment(e)}
          className="w-full flex-1 flex flex-col items-start gap-6"
        >
          <p className="text-gray-700 font-medium">Booking slots</p>
          <div className="w-full flex flex-col items-start gap-2">
            <div className="w-full flex flex-row items-start gap-3 p-4 overflow-x-scroll">
              {docSlots.length > 0 &&
                docSlots.map((item, index) => (
                  <div
                    onClick={() => {
                      setSlotDateIndex(index);
                      setSlotTimeIndex(0);
                    }}
                    key={index}
                    className={`min-w-16 flex flex-col items-center border gap-1 border-gray-300 py-6 px-3 rounded-full cursor-pointer transition-all duration-300 ${
                      index === slotDateIndex ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    <p>{item[0].datetime.getDate()}</p>
                    <p>{daysOfWeek[item[0].datetime.getDay()]}</p>
                  </div>
                ))}
            </div>
            <div className="w-full flex flex-row items-start gap-3 p-4 overflow-auto">
              {docSlots.length > 0 &&
                docSlots[slotDateIndex].map((item, index) => (
                  <div
                    onClick={() => {
                      setSlotTimeIndex(index);
                    }}
                    key={index}
                    className={`flex-shrink-0 flex flex-col items-center border gap-1 border-gray-300 py-3 px-8 rounded-full cursor-pointer transition-all duration-300 ${
                      slotTimeIndex === index ? "bg-blue-500 text-white" : ""
                    }`}
                  >
                    <p className="whitespace-nowrap">
                      {item.datetime.toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </p>
                  </div>
                ))}
            </div>
          </div>

          <button className="px-15 py-3 rounded-full bg-blue-500 text-white cursor-pointer hover:bg-blue-700 transition-all duration-500">
            Book an Appointment
          </button>
        </form>
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-3xl ">Related Doctors</p>
        <p className="text-gray-700">
          Simply browse through our extensive list of trusted doctors.
        </p>
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-6 mt-10">
          {filterdDoctors.map((item) => (
            <div
              key={item.id}
              className="flex flex-col items-start gap-4 pb-4 border border-gray-300 rounded-lg cursor-pointer hover:translate-y-[-10px] transition-all duration-500 overflow-hidden"
              onClick={() => {
                navigate("/appointments/" + item.id);
                scrollTo(0, 0);
              }}
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
      </div>
    </div>
  ) : (
    <p className="text-4xl text-center mt-10">Doctor not found</p>
  );
};

export default Appointments;
