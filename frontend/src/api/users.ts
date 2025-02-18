import axios from "axios";

const API_URL = "http://localhost:5001/api/users";

interface User {
  id: number;
  nombre: string;
  email: string;
  rol: "administrador" | "usuario";
  fecha_ingreso: string;
}

export const getAllUsers = async (token: string): Promise<User[]> => {
  const { data } = await axios.get<User[]>(`${API_URL}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return data;
};

export const changeUserRole = async (userId: number, newRole: "administrador" | "usuario", token: string) => {
  return axios.put(
    `${API_URL}/role/${userId}`,
    { newRole },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
