import { Request, Response } from "express";
import pool from "../config/database";
import { UserBook } from "../types/UserBook";

// ✅ Comprar o rentar un libro
export const createTransaction = async (req: Request, res: Response) => {
    try {
      const { usuario_id, libro_id, tipo, dias_renta } = req.body;
  
      if (!usuario_id || !libro_id || !tipo) {
        res.status(400).json({ error: "Faltan datos en la solicitud" });
        return;
      }
  
      // Verificar stock antes de procesar la compra o renta
      const libro = await pool.query("SELECT stock FROM libros WHERE id = $1", [libro_id]);
      if (!libro.rows.length) {
        res.status(404).json({ error: "Libro no encontrado." });
        return;
      }
  
      if (libro.rows[0].stock < 1) {
        res.status(400).json({ error: "No hay suficiente stock para este libro." });
        return;
      }
  
      // Si es una compra, reducir el stock
      if (tipo === "compra" || tipo === "renta") {
        await pool.query("UPDATE libros SET stock = stock - 1 WHERE id = $1", [libro_id]);
      }
  
      // Calcular la fecha de vencimiento si es una renta
      let fecha_vencimiento = null;
      if (tipo === "renta") {
        if (!dias_renta || dias_renta <= 0) {
          res.status(400).json({ error: "Número de días inválido para la renta." });
          return;
        }
        const fechaActual = new Date();
        fechaActual.setDate(fechaActual.getDate() + dias_renta);
        fecha_vencimiento = fechaActual.toISOString();
      }
  
      // Insertar la transacción
      await pool.query(
        "INSERT INTO transacciones (usuario_id, libro_id, tipo, fecha_vencimiento, disponible) VALUES ($1, $2, $3, $4, TRUE)",
        [usuario_id, libro_id, tipo, fecha_vencimiento]
      );
  
      res.status(201).json({ message: "Transacción realizada con éxito" });
    } catch (error) {
      console.error("Error en la transacción:", error);
      res.status(500).json({ error: "Error al procesar la transacción" });
    }
  };
  
  

// ✅ Obtener libros comprados o rentados por un usuario
export const getUserBooks = async (req: Request, res: Response) => {
  try {
    const { usuario_id } = req.params;

    if (!usuario_id) {
      res.status(400).json({ error: "El usuario_id es requerido" });
      return;
    }

    const result = await pool.query(
      `SELECT t.id, l.nombre, l.autor, l.imagen_url, t.tipo, t.fecha_vencimiento 
       FROM transacciones t 
       JOIN libros l ON t.libro_id = l.id 
       WHERE usuario_id = $1 AND t.disponible = TRUE`,
      [usuario_id]
    );

    const books: UserBook[] = result.rows;
    res.json(books);
  } catch (error) {
    console.error("Error al obtener libros del usuario:", error);
    res.status(500).json({ error: "Error al obtener los libros del usuario" });
  }
};

// ✅ Eliminar libros rentados cuando la fecha de vencimiento haya pasado
export const removeExpiredRentals = async () => {
  try {
    await pool.query(
      "UPDATE transacciones SET disponible = FALSE WHERE tipo = 'renta' AND fecha_vencimiento < NOW()"
    );
    console.log("Se han eliminado las rentas vencidas.");
  } catch (error) {
    console.error("Error al eliminar rentas vencidas:", error);
  }
};

// ✅ Función para devolver un libro rentado
export const returnBook = async (req: Request, res: Response) => {
    try {
      const { transaction_id } = req.params;
  
      if (!transaction_id) {
        res.status(400).json({ error: "El transaction_id es requerido" });
        return;
      }
  
      // Obtener los datos de la transacción
      const transaction = await pool.query(
        "SELECT libro_id, tipo FROM transacciones WHERE id = $1 AND disponible = TRUE",
        [transaction_id]
      );
  
      if (transaction.rows.length === 0) {
        res.status(400).json({ error: "No se encontró la renta activa." });
        return;
      }
  
      const { libro_id, tipo } = transaction.rows[0];
  
      // Marcar la transacción como finalizada
      await pool.query("UPDATE transacciones SET disponible = FALSE WHERE id = $1", [transaction_id]);
  
      // Si es una renta, devolver el libro al stock
      if (tipo === "renta") {
        await pool.query("UPDATE libros SET stock = stock + 1 WHERE id = $1", [libro_id]);
      }
  
      res.json({ message: "Libro devuelto con éxito" });
    } catch (error) {
      console.error("Error al devolver libro:", error);
      res.status(500).json({ error: "Error al devolver el libro" });
    }
  };
  
  
  // ✅ Verifica que `returnBook` está en la lista de exportaciones
