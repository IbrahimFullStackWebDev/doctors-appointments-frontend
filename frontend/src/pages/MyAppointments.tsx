import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useAppContext } from "../context/AppContext";
import type { ResponseType, UserAppointmentInfo } from "../types";
import { useSearchParams } from "react-router-dom";

const MyAppointments = () => {
  const { backendUrl, uToken } = useAppContext();
  const [appointments, setAppointments] = useState<UserAppointmentInfo[]>();
  const [showModal, setShowModal] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success");
  const appointmentId = searchParams.get("appointmentId");

  const getUserAppointments = async () => {
    try {
      const { data } = await axios.post<ResponseType>(
        `${backendUrl}/api/user/appointments`,
        {},
        { headers: { uToken: uToken } },
      );
      if (data.success) {
        setAppointments(data.userAppointments);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (uToken) {
      getUserAppointments();
    }
  }, [uToken]);

  const updatePaymentStatus = async () => {
    try {
      const { data } = await axios.post<ResponseType>(
        backendUrl + "/api/user/update-payment",
        { success, appointmentId },
        { headers: { uToken } },
      );

      if (data.success) {
        toast.success(data.message);
        setAppointments((prev) =>
          prev?.map((item) =>
            item.AppointmentsInfo.id === Number(appointmentId)
              ? {
                  ...item,
                  AppointmentsInfo: { ...item.AppointmentsInfo, payment: true },
                }
              : item,
          ),
        );
        setSearchParams({});
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      console.log(error);
    }
  };

  useEffect(() => {
    if (success && appointmentId && uToken) {
      updatePaymentStatus();
    }
  }, [success, appointmentId, uToken]);

  const payStripe = async (appointmentId: number, doctorName: string) => {
    try {
      const { data } = await axios.post(
        backendUrl + "/api/user/payment-stripe",
        { appointmentId, doctorName },
        { headers: { uToken } },
      );

      if (data.success) {
        const { session_url } = data;
        window.location.replace(session_url);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      const err = error as Error;
      toast.error(err.message);
      console.log(error);
    }
  };

  const cancelAppointment = async (appointmentID: number) => {
    try {
      const { data } = await axios.put<ResponseType>(
        `${backendUrl}/api/user/change-status`,
        { status: "cancelled", appointmentID },
        {
          headers: { uToken: uToken },
        },
      );
      if (data.success) {
        toast.success(data.message);
        setAppointments((prev) =>
          prev?.map((item) =>
            item.AppointmentsInfo.id === appointmentID
              ? {
                  ...item,
                  AppointmentsInfo: {
                    ...item.AppointmentsInfo,
                    status: "cancelled",
                  },
                }
              : item,
          ),
        );
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
    appointments && (
      <div className="w-full mt-20 flex flex-col items-start gap-4">
        <p className="text-gray-700 text-xl font-medium">My Appointments</p>

        {appointments &&
          appointments.map((item) => (
            <div
              key={item.AppointmentsInfo.id}
              className="w-full flex flex-col sm:flex-row sm:items-start md:items-end gap-8 justify-between border-t border-b py-4 border-gray-300 flex-wrap"
            >
              <div className="flex-4 flex flex-row items-center gap-4">
                <img
                  src={item?.doctorInfo.image}
                  className="w-40 bg-blue-100 rounded-lg"
                  alt=""
                />
                <div className="flex flex-col items-start gap-3">
                  <div className="flex flex-col items-start">
                    <p className="text-lg">{item?.doctorInfo.name}</p>
                    <p className="text-gray-500 text-sm">
                      {item?.doctorInfo.speciality}
                    </p>
                  </div>
                  <div className="flex flex-col items-start gap-2">
                    <p className="text-lg">Address:</p>
                    <div className="flex flex-col items-start">
                      <p className="text-gray-500 text-sm">
                        {item?.doctorInfo.address.line1}
                      </p>
                      <p className="text-gray-500 text-sm">
                        {item?.doctorInfo.address.line2}
                      </p>
                    </div>
                  </div>
                  <p className="w-full text-gray-900">
                    Date & Time:{" "}
                    <span className="text-gray-500 text-sm">
                      {item.AppointmentsInfo.slotDate} |{" "}
                      {item?.AppointmentsInfo.slotTime}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex-1 flex flex-col items-end justify-end gap-4">
                {item.AppointmentsInfo.status === "scheduled" ? (
                  item.AppointmentsInfo.payment === false ? (
                    <>
                      <button
                        onClick={() =>
                          payStripe(
                            item.AppointmentsInfo.id,
                            item.doctorInfo.name,
                          )
                        }
                        className="w-full py-2 px-10 text-sm rounded-md bg-blue-500 text-white hover:bg-blue-700 transition-all duration-300 cursor-pointer"
                      >
                        Pay
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(item.AppointmentsInfo.id);
                          setShowModal(true);
                        }}
                        className="flex-1 w-full py-2 px-10 border text-sm text-gray-700 rounded-md border-gray-300  hover:text-white hover:bg-red-500 transition-all duration-300 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <p className="flex-1 w-full text-center py-2 px-10 border text-sm rounded-md border-blue-300  text-blue-500 cursor-not-allowed">
                      Paid
                    </p>
                  )
                ) : item.AppointmentsInfo.status === "cancelled" ? (
                  <p className="flex-1 w-full text-center py-2 px-10 border text-sm rounded-md border-red-300  text-red-500 cursor-not-allowed">
                    Cancelled
                  </p>
                ) : (
                  <p className="flex-1 w-full text-center py-2 px-10 border text-sm rounded-md border-green-300  text-green-500 cursor-not-allowed">
                    Completed
                  </p>
                )}
              </div>
            </div>
          ))}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-sm shadow-2xl transform transition-all animate-in fade-in zoom-in duration-200">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Confirm Cancellation
              </h3>
              <p className="text-gray-500 mb-6">
                Are you sure you want to cancel this appointment? This action
                cannot be undone.
              </p>

              <div className="flex gap-3 justify-end">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
                >
                  No, Keep it
                </button>
                <button
                  onClick={() => {
                    if (selectedId) cancelAppointment(selectedId);
                    setShowModal(false);
                  }}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 shadow-md shadow-red-200 transition-colors cursor-pointer"
                >
                  Yes, Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  );
};
// 'scheduled', 'completed', 'cancelled'
export default MyAppointments;
