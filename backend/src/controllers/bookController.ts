import { Request, Response } from "express";
import pool from "../config/database";

// Obtener todos los libros
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT id, nombre, frase, descripcion, autor, paginas, imagen_url, stock FROM libros");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener libros:", error);
    res.status(500).json({ error: "Error al obtener la lista de libros" });
  }
};

// Agregar un nuevo libro
export const addBook = async (req: Request, res: Response) => {
  try {
    const { nombre, frase, descripcion, autor, paginas, imagen_url, stock } = req.body;

    const result = await pool.query(
      "INSERT INTO libros (nombre, frase, descripcion, autor, paginas, imagen_url, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [nombre, frase, descripcion, autor, paginas, imagen_url, stock]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al agregar libro:", error);
    res.status(500).json({ error: "Error al agregar libro" });
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nombre, frase, descripcion, autor, paginas, imagen_url, stock } = req.body;

    const result = await pool.query(
      "UPDATE libros SET nombre = $1, frase = $2, descripcion = $3, autor = $4, paginas = $5, imagen_url = $6, stock = $7 WHERE id = $8 RETURNING *",
      [nombre, frase, descripcion, autor, paginas, imagen_url, stock, id]
    );

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error al actualizar libro:", error);
    res.status(500).json({ error: "Error al actualizar libro" });
  }
};



// Eliminar un libro
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM libros WHERE id = $1", [id]);
    res.json({ message: "Libro eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar libro:", error);
    res.status(500).json({ error: "Error al eliminar libro" });
  }
};
