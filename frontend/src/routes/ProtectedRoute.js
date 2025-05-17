import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../utils/Auth";

const ProtectedRoute = ({ children, allowedRole }) => {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/" />;

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
