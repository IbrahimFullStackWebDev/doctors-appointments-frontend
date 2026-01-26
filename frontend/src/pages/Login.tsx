import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useAppContext } from "../context/AppContext.tsx";
import { type ResponseType, type UserType } from "../types/index.ts";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [status, setStatus] = useState<string>("login");
  const [loading, setLoading] = useState<boolean>(false);
  const { backendUrl, setUToken, setUserInfo } = useAppContext();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (status === "sign up") {
        const { data } = await axios.post<ResponseType>(
          `${backendUrl}/api/user/register`,
          {
            name,
            email,
            password,
          },
        );
        if (data.success) {
          toast.success(data.message);
          navigate("/");
          setUToken(data.uToken as string);
          setUserInfo(data.user as UserType);
          localStorage.setItem("uToken", data.uToken as string);
          localStorage.setItem("userInfo", JSON.stringify(data.user));
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axios.post<ResponseType>(
          `${backendUrl}/api/user/login`,
          {
            email,
            password,
          },
        );

        if (data.success) {
          toast.success(data.message);
          navigate("/");

          setUToken(data.uToken as string);
          setUserInfo(data.user as UserType);

          localStorage.setItem("uToken", data.uToken as string);
          localStorage.setItem("userInfo", JSON.stringify(data.user));
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      const err = error as Error;
      console.log(err);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={(e) => handleSubmit(e)}
      className="w-full max-w-[400px] flex flex-col items-start gap-3 border border-gray-300 rounded-lg m-auto mt-10 shadow-lg px-8 py-10"
    >
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
            onChange={(e) => setName(e.target.value)}
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
          onChange={(e) => setEmail(e.target.value)}
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
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        disabled={loading}
        className="w-full flex justify-center items-center py-2 text-center bg-blue-500 text-white text-lg rounded-md cursor-pointer hover:bg-blue-700 transition-all duration-300"
      >
        {loading ? (
          <div className="w-6 h-6 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
        ) : status === "login" ? (
          "Login"
        ) : (
          "Create an account"
        )}
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
          {status === "login" ? "Sign up here" : "Login here"}
        </span>
      </p>
    </form>
  );
};

export default Login;
