import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import { toast } from "react-toastify";
import axios from "axios";
import type { ResponseType, UserType } from "../types";

const MyProfile = () => {
  const { userInfo, setUserInfo, backendUrl, uToken } = useAppContext();
  const [updatedData, setUpdatedData] = useState<UserType>(userInfo);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [image, setImage] = useState<File | null>(null);
  const handleSubmit = async () => {
    const formData = new FormData();
    if (image) {
      formData.append("image", image);
    }
    formData.append("name", updatedData.name);
    formData.append("email", updatedData.email);
    formData.append("phone", updatedData.phone);
    formData.append("address", JSON.stringify(updatedData.address));
    formData.append("gender", updatedData.gender);
    formData.append("dob", updatedData.dob.toString());

    try {
      const { data } = await axios.put<ResponseType>(
        `${backendUrl}/api/user/update-profile`,
        formData,
        { headers: { uToken } },
      );
      if (data.success) {
        toast.success(data.message);
        const finalData: UserType = {
          ...updatedData,
          image: data.imageUrl ? (data.imageUrl as string) : updatedData.image,
        };

        setUpdatedData(finalData);
        setUserInfo(finalData);
        localStorage.setItem("userInfo", JSON.stringify(finalData));

        setImage(null);
        setIsEdit(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      console.log(error);
    }
  };
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full flex flex-col items-start gap-4 mt-2"
    >
      {isEdit ? (
        <>
          <label htmlFor="image" className="relative cursor-pointer">
            <img
              src={image ? URL.createObjectURL(image) : updatedData.image}
              className="w-35 opacity-75"
              alt="profile image"
            />
            <img
              src={assets.upload_icon}
              className="w-18 absolute top-10 left-8"
              alt=""
            />
            <input
              type="file"
              id="image"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setImage(e.target.files[0]);
                }
              }}
              hidden
            />
          </label>

          <div className="w-1/2 flex flex-col items-start gap-2">
            <input
              type="text"
              placeholder="name"
              className="text-2xl text-gray-500 p-1 border border-gray-300 rounded-md"
              value={updatedData?.name || ""}
              onChange={(e) =>
                setUpdatedData((obj) => ({ ...obj, name: e.target.value }))
              }
            />
            <hr className="w-full h-0.5 border-none bg-gray-300" />
          </div>
          <div className="w-[350px] flex flex-col items-start gap-4">
            <p className="text-gray-500 text-sm underline">
              CONTACT INFORMATION
            </p>
            <div className="w-full flex flex-row items-center justify-between">
              <label className="text-gray-900" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="text-blue-500 p-1 border border-gray-300 rounded-md"
                value={updatedData?.email || ""}
                onChange={(e) =>
                  setUpdatedData((obj) => ({ ...obj, email: e.target.value }))
                }
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <label className="text-gray-900" htmlFor="phone">
                phone
              </label>
              <input
                type="number"
                id="phone"
                className="text-blue-500 p-1 border border-gray-300 rounded-md"
                value={updatedData?.phone || ""}
                onChange={(e) =>
                  setUpdatedData((obj) => ({ ...obj, phone: e.target.value }))
                }
              />
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <label className="text-gray-900" htmlFor="address">
                Address
              </label>
              <div className="flex flex-col items-end gap-2">
                <input
                  type="text"
                  id="address"
                  className="text-gray-500 p-1 border border-gray-300 rounded-md"
                  value={updatedData.address?.line1 || ""}
                  onChange={(e) =>
                    setUpdatedData((obj) => ({
                      ...obj,
                      address: {
                        ...obj.address,
                        line1: e.target.value,
                      },
                    }))
                  }
                />
                <input
                  type="text"
                  id="address"
                  className="text-gray-500 p-1 border border-gray-300 rounded-md"
                  value={updatedData.address?.line2 || ""}
                  onChange={(e) =>
                    setUpdatedData((obj) => ({
                      ...obj,
                      address: {
                        ...obj.address,
                        line2: e.target.value,
                      },
                    }))
                  }
                />
              </div>
            </div>
          </div>
          <div className="w-[350px] flex flex-col items-start gap-4">
            <p className="text-gray-500 text-sm underline">BASIC INFORMATION</p>
            <div className="w-full flex flex-row items-center justify-between">
              <label className="text-gray-900" htmlFor="gender">
                Gender
              </label>
              <select
                className="text-gray-500 p-1 border border-gray-300 rounded-md cursor-pointer"
                id="gender"
                value={updatedData?.gender || "Male"}
                onChange={(e) =>
                  setUpdatedData((obj) => ({ ...obj, gender: e.target.value }))
                }
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <label className="text-gray-900" htmlFor="birthday">
                Birthday
              </label>
              <input
                className="text-gray-500 p-1 border border-gray-300 rounded-md cursor-pointer"
                type="date"
                id="birthday"
                value={new Date(updatedData?.dob).toISOString().split("T")[0]}
                onChange={(e) =>
                  setUpdatedData((obj) => ({
                    ...obj,
                    dob: new Date(e.target.value).getTime(),
                  }))
                }
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <img
            src={image ? URL.createObjectURL(image) : updatedData.image}
            className="w-35"
            alt="profile image"
          />
          <div className="w-1/2 flex flex-col items-start gap-2">
            <p className="text-3xl text-black ">{updatedData.name}</p>
            <hr className="w-full h-0.5 border-none bg-gray-300" />
          </div>
          <div className="w-[350px] flex flex-col items-start gap-4">
            <p className="text-gray-500 text-sm underline">
              CONTACT INFORMATION
            </p>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-gray-900">Email:</p>
              <p className="text-blue-700 ">{updatedData.email}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-gray-900">Phone:</p>
              <p className="text-blue-700">{updatedData.phone}</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-gray-900">Address:</p>
              <div className="flex flex-col items-end gap-2">
                <p className="text-gray-900">{updatedData.address.line1}</p>
                <p className="text-gray-900">{updatedData.address.line2}</p>
              </div>
            </div>
          </div>
          <div className="w-[350px] flex flex-col items-start gap-4">
            <p className="text-gray-500 text-sm underline">BASIC INFORMATION</p>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-gray-700">{updatedData.gender}</p>
              <p className="text-gray-700">Male:</p>
            </div>
            <div className="w-full flex flex-row items-center justify-between">
              <p className="text-gray-700">Birthday:</p>
              <p className="text-gray-700">
                {new Date(updatedData.dob).toISOString().split("T")[0]}
              </p>
            </div>
          </div>
        </>
      )}
      <button
        onClick={() => (isEdit ? handleSubmit() : setIsEdit(true))}
        className="px-6 py-3 border border-blue-500 rounded-full cursor-pointer hover:bg-blue-500 transition-all duration-300 hover:text-white"
      >
        {isEdit ? "Save Information" : "Edit"}
      </button>
    </form>
  );
};

export default MyProfile;
