import { Navigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { uToken } = useAppContext();
  return uToken ? children : <Navigate to="/login" />;
};
export default ProtectedRoute;
