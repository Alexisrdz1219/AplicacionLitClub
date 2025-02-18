"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware para verificar el token
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Acceso denegado. Token no proporcionado" });
        return;
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Asigna el usuario autenticado a `req`
        next();
    }
    catch (error) {
        res.status(401).json({ error: "Token inválido" });
        return;
    }
};
exports.verifyToken = verifyToken;
// Middleware para verificar si el usuario es administrador
const isAdmin = (req, res, next) => {
    if (!req.user || req.user.rol !== "administrador") {
        res.status(403).json({ error: "Acceso denegado. Se requiere rol de administrador." });
        return;
    }
    next();
};
exports.isAdmin = isAdmin;
