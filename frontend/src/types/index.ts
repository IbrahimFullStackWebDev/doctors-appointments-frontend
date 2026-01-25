export interface NavItems {
  path: string;
  label: string;
}
export interface Slots {
  datetime: Date;
  time?: string;
}

export interface Address {
  line1?: string;
  line2?: string;
}

export interface UserType {
  id: number;
  name: string;
  image: string;
  email: string;
  phone: string;
  gender: string;
  dob: number;
  address: Address;
}

export interface DoctorDataType {
  id: number;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  available: boolean;
  about: string;
  fees: number;
  address: Address;
}

export interface SpecialityItem {
  id: number;
  speciality: string;
  image: string;
}

export interface AppContextType {
  backendUrl: string;
  uToken: string;
  setUToken: (uToken: string | null) => void;
  doctors: DoctorDataType[];
  setUserInfo: React.Dispatch<React.SetStateAction<UserType | null>>;
  userInfo: UserType;
}

export interface UserAppointmentInfo {
  AppointmentsInfo: BookAppointmentsType;
  doctorInfo: {
    image: string;
    name: string;
    speciality: string;
    address: Address;
  };
}
export interface ResponseType {
  success: boolean;
  message?: string;
  uToken?: string;
  doctors?: DoctorDataType[];
  user?: UserType;
  imageUrl?: string;
  userAppointments?: UserAppointmentInfo[];
}
export interface BookAppointmentsType {
  id: number;
  userId?: number;
  doctorId: number;
  slotDate: string;
  slotTime: string;
  amount: number;
  status?: string;
  payment?: boolean;
}
