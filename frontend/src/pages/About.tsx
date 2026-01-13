import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="w-full flex flex-col items-start gap-15 mt-15">
      <h1 className="text-2xl text-gray-500">
        ABOUT <span className="text-gray-900">US</span>
      </h1>
      <div className="flex flex-row items-center gap-10">
        {/* Right Side */}
        <img src={assets.about_image} className="w-90" alt="about image" />
        <div className="flex flex-col items-start gap-8">
          <p className="text-gray-700 text-sm">
            Welcome to Prescripto, your trusted partner in managing your
            healthcare needs <br /> conveniently and efficiently. At Prescripto,
            we understand the challenges individuals face <br /> when it comes
            to scheduling doctor appointments and managing their health records.
          </p>
          <p className="text-gray-700 text-sm">
            Prescripto is committed to excellence in healthcare technology. We
            continuously strive to <br />
            enhance our platform, integrating the latest advancements to improve
            user experience and <br /> deliver superior service. Whether you're
            booking your first appointment or managing ongoing care,
            <br /> Prescripto is here to support you every step of the way.
          </p>
          <p className="text-gray-900 font-medium">Our Vision</p>
          <p className="text-gray-700 text-sm">
            Our vision at Prescripto is to create a seamless healthcare
            experience for every user. We aim to bridge the gap
            <br /> between patients and healthcare providers, making it easier
            for you to access the care you need, when you need it.
          </p>
        </div>
      </div>
      <div className="flex w-full flex-col items-start gap-10">
        <p className="text-2xl text-gray-700">
          WHY <span className="text-gray-900 font-medium">CHOOSE US</span>
        </p>
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col items-start gap-4 border border-gray-300  text-gray-700 py-15 px-20 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-500">
            <p className="text-lg font-medium">EFFICIENCY:</p>
            <p className="text-sm whitespace-nowrap">
              Streamlined appointment scheduling <br /> that fits into your busy
              lifestyle.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 border border-gray-300 py-15 px-20 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-500">
            <p className="text-lg font-medium">CONVENIENCE:</p>
            <p className="text-sm whitespace-nowrap">
              Access to a network of trusted <br /> healthcare professionals in
              your area.
            </p>
          </div>
          <div className="flex flex-col items-start gap-4 border border-gray-300 py-15 px-20 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-500">
            <p className="text-lg font-medium">PERSONALIZATION:</p>
            <p className="text-sm whitespace-nowrap">
              Tailored recommendations and reminders to <br /> help you stay on
              top of your health.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
