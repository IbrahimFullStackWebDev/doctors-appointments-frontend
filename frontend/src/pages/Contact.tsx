import React from "react";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div className="w-full flex flex-col items-center gap-10 justify-center mt-10">
      <h1 className="text-2xl text-gray-500">
        CONTACT <span className="text-gray-700 font-medium">US</span>
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-8">
        {/* Right Side */}
        <img
          src={assets.contact_image}
          className="w-full sm:max-w-[360px]"
          alt="contact image"
        />
        {/* Left Side */}
        <div className="flex w-full flex-col items-start gap-6">
          <p className="font-bold text-xl text-gray-700">OUR OFFICE</p>
          <div className="flex flex-col items-start text-sm text-gray-700">
            <p>00000 Willms Station</p>
            <p>Suite 000, Washington, USA</p>
          </div>
          <div className="flex flex-col items-start text-sm text-gray-700">
            <p>Tel: (000) 000-0000</p>
            <p>Email: ibrahim.fullstack.dev@gmail.com</p>
          </div>
          <p className="font-bold text-xl text-gray-700">
            CAREERS AT PRESCRIPTO
          </p>
          <p className="text-sm text-gray-500">
            Learn more about our teams and job openings.
          </p>
          <button className="px-6 py-4 border hover:bg-black hover:text-white cursor-pointer transition-all duration-300">
            Explore Jops
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contact;
