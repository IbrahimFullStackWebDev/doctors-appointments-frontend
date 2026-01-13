// src/types/index.ts

export interface Slots {
  datetime: Date;
  time?: string;
}

export interface Address {
  line1: string;
  line2: string;
}

export interface Doctor {
  _id: string;
  name: string;
  image: string;
  speciality: string;
  degree: string;
  experience: string;
  about: string;
  fees: number;
  address: Address;
}

export interface SpecialityItem {
  id: number;
  speciality: string;
  image: string;
}
