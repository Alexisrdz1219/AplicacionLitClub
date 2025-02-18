import { Navigate } from "react-router-dom";
import { JSX, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface ProtectedRouteProps {
  children: JSX.Element;
  roleRequired?: "administrador" | "usuario";
}

export const ProtectedRoute = ({ children, roleRequired }: ProtectedRouteProps) => {
  const auth = useContext(AuthContext);

  if (!auth?.token) {
    return <Navigate to="/login" />;
  }

  if (roleRequired && auth.user?.rol !== roleRequired) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};
