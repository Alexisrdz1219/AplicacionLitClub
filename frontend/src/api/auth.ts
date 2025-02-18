import axios from "axios";

const API_URL = "http://localhost:5001/api/auth";

interface LoginResponse {
  message: string;
  token: string;
  user: {
    id: number;
    nombre: string;
    email: string;
    rol: "administrador" | "usuario";
    fecha_ingreso: string;
  };
}

export const registerUser = async (nombre: string, email: string, contraseña: string) => {
  return axios.post(`${API_URL}/register`, { nombre, email, contraseña });
};

export const loginUser = async (email: string, contraseña: string): Promise<LoginResponse> => {
  const { data } = await axios.post<LoginResponse>(`${API_URL}/login`, { email, contraseña });
  return data;
};

