"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeUserRole = void 0;
const database_1 = __importDefault(require("../config/database"));
const changeUserRole = async (req, res) => {
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
        const userExists = await database_1.default.query("SELECT * FROM usuarios WHERE id = $1", [id]);
        if (userExists.rows.length === 0) {
            res.status(404).json({ error: "Usuario no encontrado." });
            return;
        }
        // Actualizar el rol del usuario
        await database_1.default.query("UPDATE usuarios SET rol = $1 WHERE id = $2", [newRole, id]);
        res.json({ message: "Rol actualizado correctamente." });
    }
    catch (error) {
        res.status(500).json({ error: "Error al actualizar el rol." });
    }
};
exports.changeUserRole = changeUserRole;
