import { Request, Response } from "express";
import pool from "../config/database";

// Definimos una interfaz para el usuario autenticado
interface AuthenticatedRequest extends Request {
  user?: { id: number; rol: "administrador" | "usuario" };
}

export const changeUserRole = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { newRole } = req.body;

    // Verificar que el nuevo rol es válido
    if (!["administrador", "usuario"].includes(newRole)) {
      res.status(400).json({ error: "Rol inválido. Debe ser 'administrador' o 'usuario'." });
      return;
    }

    // Verificar que el usuario autenticado es administrador
    if (!req.user || req.user.rol !== "administrador") {
      res.status(403).json({ error: "Acceso denegado. Se requiere rol de administrador." });
      return;
    }

    // Verificar que el usuario que se intenta modificar existe
    const userExists = await pool.query("SELECT * FROM usuarios WHERE id = $1", [id]);
    if (userExists.rows.length === 0) {
      res.status(404).json({ error: "Usuario no encontrado." });
      return;
    }

    // Actualizar el rol del usuario
    await pool.query("UPDATE usuarios SET rol = $1 WHERE id = $2", [newRole, id]);

    res.json({ message: "Rol actualizado correctamente." });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el rol." });
  }
};

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await pool.query("SELECT id, nombre, email, rol, fecha_ingreso FROM usuarios");
    res.json(result.rows);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error al obtener la lista de usuarios" });
  }
};