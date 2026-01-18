export interface NavItems {
  path: string;
  lable: string;
}
export interface Slots {
  datetime: Date;
  time?: string;
}

export interface Address {
  line1: string;
  line2: string;
}

export interface UserType {
  id: number;
  name: string;
  image: string;
  email: string;
  phone: string | null;
  gender: string | null;
  dob: number | null;
  address: Address | null;
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
}
export interface ResponseType {
  success: boolean;
  message?: string;
  uToken?: string;
  doctors?: DoctorDataType[];
}
export interface BookAppointmentsType {
  userId?: number;
  doctorId: number;
  slotDate: string;
  slotTime: string;
  amount: number;
  status?: string;
  payment?: boolean;
}
