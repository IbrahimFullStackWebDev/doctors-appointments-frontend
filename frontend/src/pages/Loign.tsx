import React, { useState } from "react";

const Loign = () => {
  const [status, setStatus] = useState<string>("login");
  return (
    <div className="w-full max-w-[400px] flex flex-col items-start gap-3 border border-gray-300 rounded-lg m-auto mt-10 shadow-lg px-8 py-10">
      <h1 className="text-2xl text-gray-600 font-medium">
        {status === "login" ? "Login" : "Create an Account"}
      </h1>
      <p className="text-sm text-gray-700">
        Please {status === "login" ? "sign up" : "login"} to book appointment
      </p>
      {status === "sign up" ? (
        <div className="w-full flex flex-col text-start gap-1">
          <label htmlFor="full-name" className="text-gray-500 text-sm">
            Full Name
          </label>
          <input
            type="text"
            className="w-full border border-gray-300 px-1 py-2 rounded-md text-sm text-gray-500"
            id="full-name"
          />
        </div>
      ) : (
        ""
      )}

      <div className="w-full flex flex-col text-start gap-1">
        <label htmlFor="email" className="text-gray-500 text-sm">
          Email
        </label>
        <input
          type="email"
          required
          className="w-full border border-gray-300 px-1 py-2 rounded-md text-sm text-gray-500"
          id="email"
        />
      </div>
      <div className="w-full flex flex-col text-start gap-1">
        <label htmlFor="password" className="text-gray-500 text-sm">
          Password
        </label>
        <input
          type="password"
          required
          className="w-full border border-gray-300 px-1 py-2 rounded-md text-sm text-gray-500"
          id="password"
        />
      </div>
      <button className="w-full py-2 text-center bg-blue-500 text-white text-lg rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-300">
        {status === "login" ? "Login" : "Create an account"}
      </button>
      <p className="text-sm text-gray-500">
        {status === "login"
          ? "Already have an account? "
          : "Create a new account? "}
        <span
          className="underline text-blue-500 cursor-pointer"
          onClick={() =>
            status === "login" ? setStatus("sign up") : setStatus("login")
          }
        >
          {status === "login" ? "Login here" : "Sign up here"}
        </span>
      </p>
    </div>
  );
};

export default Loign;
