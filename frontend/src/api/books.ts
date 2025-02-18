import axios from "axios";
import { Book } from "../types/Book";

const API_URL = "http://localhost:5001/api/books";

export const getAllBooks = async (): Promise<Book[]> => {
  const { data } = await axios.get<Book[]>(API_URL);
  return data;
};

export const addBook = async (book: Omit<Book, "id">, token: string) => {
  return axios.post("http://localhost:5001/api/books", book, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
};

export const updateBook = async (id: number, book: Book, token: string) => {
  return axios.put(`http://localhost:5001/api/books/${id}`, book, {
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
  });
};


export const deleteBook = async (id: number, token: string) => {
  return axios.delete(`${API_URL}/${id}`, { headers: { Authorization: `Bearer ${token}` } });
};
