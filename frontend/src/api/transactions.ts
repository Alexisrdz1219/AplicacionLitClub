import axios from "axios";
import { UserBook } from "../types/UserBook";

const API_URL = "http://localhost:5001/api/transactions";

export const createTransaction = async (
  usuario_id: number,
  libro_id: number,
  tipo: "compra" | "renta",
  dias_renta?: number,
  token?: string
) => {
  if (!token) throw new Error("Token de autenticación no encontrado.");

  return axios.post(
    API_URL,
    { usuario_id, libro_id, tipo, dias_renta },
    {
      headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    }
  );
};

export const getUserBooks = async (usuario_id: number, token: string): Promise<UserBook[]> => {
    if (!token) throw new Error("Token de autenticación no encontrado.");
  
    const { data } = await axios.get(`${API_URL}/${usuario_id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  
    return data as UserBook[]; // ✅ Forzamos el tipo para evitar el error `unknown`
  };

export const returnBook = async (transaction_id: number, token?: string) => {
  if (!token) throw new Error("Token de autenticación no encontrado.");

  return axios.put(`${API_URL}/return/${transaction_id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
