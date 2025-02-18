import { createContext, useState, useEffect, ReactNode } from "react";
import { loginUser } from "../api/auth";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: "administrador" | "usuario";
  fecha_ingreso: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, contraseña: string) => Promise<void>;
  logout: () => void;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem("token"));

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  const login = async (email: string, contraseña: string) => {
    try {
      const data = await loginUser(email, contraseña);
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      console.error("Error en el login", error);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return <AuthContext.Provider value={{ user, token, login, logout }}>{children}</AuthContext.Provider>;
};
