import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/database";
import { User } from "../models/userModel";

export const register = async (req: Request, res: Response) => {
  try {
    const { nombre, email, contraseña } = req.body;
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const result = await pool.query(
      "INSERT INTO usuarios (nombre, email, contraseña, rol, fecha_ingreso) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [nombre, email, hashedPassword, "usuario"]
    );

    res.status(201).json({ message: "Usuario registrado", user: result.rows[0] });
    console.log(hashedPassword);
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, contraseña } = req.body;
    const result = await pool.query("SELECT * FROM usuarios WHERE email = $1", [email]);

    if (result.rows.length === 0) {
      res.status(400).json({ error: "Usuario no encontrado" });
      return;
    }

    const user: User = result.rows[0];
    const isMatch = await bcrypt.compare(contraseña, user.contraseña);

    if (!isMatch) {
      res.status(400).json({ error: "Contraseña incorrecta" });
      return;
    }

    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET as string, { expiresIn: "1h" });

    res.json({ message: "Inicio de sesión exitoso", token, user });
  } catch (error) {
    console.error("Error en login:", error);
    res.status(500).json({ error: "Error en el inicio de sesión" });
  }
};

