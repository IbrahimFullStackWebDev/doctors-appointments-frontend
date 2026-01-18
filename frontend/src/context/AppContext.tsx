import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";
import {
  type AppContextType,
  type DoctorDataType,
  type ResponseType,
} from "../types/index.tsx";
import axios from "axios";
import { toast } from "react-toastify";
const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [doctors, setDoctors] = useState<DoctorDataType[]>([]);
  const [uToken, setUToken] = useState<string>(
    localStorage.getItem("uToken") || "",
  );

  useEffect(() => {
    if (uToken) {
      localStorage.setItem("uToken", uToken);
    } else {
      localStorage.removeItem("uToken");
    }
  }, [uToken]);

  useEffect(() => {
    const getDoctors = async () => {
      try {
        const { data } = await axios.get<ResponseType>(
          `${backendUrl}/api/user/get-doctors`,
        );
        if (data.success) {
          setDoctors(data.doctors as DoctorDataType[]);
        } else {
          toast.error(data.message);
        }
      } catch (error) {
        const err = error as Error;
        toast.error(err.message);
        console.log(error);
      }
    };
    getDoctors();
  }, []);

  const value = {
    backendUrl,
    uToken: uToken,
    setUToken,
    doctors,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
