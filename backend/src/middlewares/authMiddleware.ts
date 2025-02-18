import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface DecodedToken {
  id: number;
  rol: "administrador" | "usuario";
}

export const verifyToken = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ error: "Acceso denegado. Token no proporcionado" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    (req as any).user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
    return;
  }
};

export const isAdmin = (req: Request, res: Response, next: NextFunction): void => {
  if (!(req as any).user || (req as any).user.rol !== "administrador") {
    res.status(403).json({ error: "Acceso denegado. Se requiere rol de administrador" });
    return;
  }
  next();
};
