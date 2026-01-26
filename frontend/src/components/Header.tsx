import { assets } from "../assets/assets";

const Header = () => {
  return (
    <header className="flex flex-col items-center gap-10">
      <div className="w-full bg-blue-500 text-white flex flex-col lg:flex-row items-end justify-between mt-8 rounded-lg px-4">
        {/* Left Side */}
        <div className="flex flex-col items-start gap-8 m-auto lg:mb-20">
          <h1 className="text-3xl md:text-5xl font-semibold leading-tight">
            Book Appointment <br />
            With Trusted Doctors
          </h1>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <img src={assets.group_profiles} className="w-25" alt="" />
            <p>
              Simply browse through our extensive list of trusted doctors,
              <br />
              schedule your appointment hassle-free.
            </p>
          </div>
          <button
            className="px-8 py-3 rounded-full bg-white cursor-pointer flex flex-row items-center text-black gap-3 hover:bg-gray-100 shadow-lg"
            onClick={() =>
              document
                .getElementById("speciality")
                ?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Book appointment <img src={assets.arrow_icon} alt="arrow icon" />
          </button>
        </div>
        {/* Right Side */}
        <img
          src={assets.header_img}
          className="w-70 sm:w-120 m-auto lg:mb-0 bg-blue-500 "
          alt="header image"
        />
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <h2 className="text-3xl">Find by Speciality</h2>
        <p className="text-gray-700 text-center">
          Simply browse through our extensive list of trusted doctors,
          <br /> schedule your appointment hassle-free.
        </p>
      </div>
    </header>
  );
};

export default Header;
