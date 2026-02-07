import Cookies from "js-cookie";
import { Navigate } from "react-router";

export default function ProtectedRoute({ children }) {
  const token = Cookies.get("admin_token");

  if (!token) {
    return <Navigate to="/"  />;
  }

  return children;
}