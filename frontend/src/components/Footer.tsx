import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mx-4 sm:mx-10 md:mx-20 lg:mx-30 mt-100 mb-20 flex flex-col items-center gap-10">
      <div className="w-full flex flex-col sm:flex-row items-start justify-between gap-10">
        <div className="flex flex-col items-start gap-8">
          <img src={assets.logo} alt="logo" className="w-45" />
          <p className="text-gray-700 text-sm">
            Lorem Ipsum is simply dummy text of the printing and typesetting{" "}
            <br />
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever <br />
            since the 1500s, when an unknown printer took a galley of type and{" "}
            <br />
            scrambled it to make a type specimen book.
          </p>
        </div>
        <div className="flex flex-col items-strat gap-8">
          <p className="font-medium text-xl">COMPANY</p>
          <div className="flex flex-col items-start gap-2 text-gray-700 text-sm">
            <p>Home</p>
            <p>About us</p>
            <p>Delivery</p>
            <p>Privacy policy</p>
          </div>
        </div>
        <div className="flex flex-col items-strat gap-8">
          <p className="font-medium text-xl">GET IN TOUCH</p>
          <div className="flex flex-col items-start gap-2 text-gray-700 text-sm">
            <p>+0-000-000-000</p>
            <p>ibrahim.fullstack.dev@gmail.com</p>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col items-center gap-4">
        <hr className="w-full text-gray-300" />
        <p className="text-sm text-gray-700">
          Copyright 2024 @ FullStack.dev - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
