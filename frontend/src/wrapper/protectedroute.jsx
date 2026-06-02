import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, roleRequired }) {

  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));
  const location = useLocation();


  if (!token) {
    return (<Navigate to="/login" state={{ from: location }} replace />);
  }
  if (roleRequired && user?.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
}