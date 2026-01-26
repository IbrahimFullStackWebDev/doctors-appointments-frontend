import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Banner = () => {
  const navigate = useNavigate();
  const { uToken } = useAppContext();
  return (
    <div className="flex flex-row items-center justify-between bg-blue-500 rounded-lg p-10 lg:px-12 lg:py-0">
      {/* lsft side */}
      <div className="flex flex-col items-start gap-10">
        <h4 className="text-5xl text-white leading-tight font-medium">
          Book Appointment <br />
          With 100+ Trusted Doctors
        </h4>
        <button
          className="px-10 py-4 bg-white rounded-full text-gray-900 cursor-pointer hover:bg-gray-100 shadow-lg"
          onClick={() => {
            navigate(uToken ? "/doctors" : "/login");
            scrollTo(0, 0);
          }}
        >
          {uToken ? "Book an appointment now" : "Create an account"}
        </button>
      </div>
      <img
        src={assets.appointment_img}
        className="w-100 hidden bg-blue-500 lg:block"
        alt=""
      />
    </div>
  );
};

export default Banner;
