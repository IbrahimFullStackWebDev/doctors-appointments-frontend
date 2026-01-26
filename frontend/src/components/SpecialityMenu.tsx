import { specialityData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { type SpecialityItem } from "../types/index";

const SpecialityMenu = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-4 py-16 text-gray-800">
      <div className="flex sm:justify-center gap-4 pt-5 w-full overflow-scroll">
        {specialityData.map((item: SpecialityItem) => (
          <div
            key={item.id}
            className="flex-shrink-0 flex flex-col items-center gap-4 cursor-pointer hover:translate-y-[-10px] transition-all duration-500"
            onClick={() => {
              navigate("/doctors/" + item.speciality);
              window.scrollTo(0, 0);
            }}
          >
            <img
              src={item.image}
              id="speciality"
              className="w-25"
              alt={item.speciality}
            />
            <p className="text-gray-700 text-sm">{item.speciality}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialityMenu;
