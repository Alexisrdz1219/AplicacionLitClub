"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const database_1 = __importDefault(require("../config/database"));
const register = async (req, res) => {
    try {
        const { nombre, email, contraseña } = req.body;
        const hashedPassword = await bcryptjs_1.default.hash(contraseña, 10);
        const result = await database_1.default.query("INSERT INTO usuarios (nombre, email, contraseña, rol, fecha_ingreso) VALUES ($1, $2, $3, $4, NOW()) RETURNING *", [nombre, email, hashedPassword, "usuario"]);
        res.status(201).json({ message: "Usuario registrado", user: result.rows[0] });
    }
    catch (error) {
        res.status(500).json({ error: "Error al registrar usuario" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        const result = await database_1.default.query("SELECT * FROM usuarios WHERE email = $1", [email]);
        if (result.rows.length === 0) {
            res.status(400).json({ error: "Usuario no encontrado" });
            return;
        }
        const user = result.rows[0];
        const isMatch = await bcryptjs_1.default.compare(contraseña, user.contraseña);
        if (!isMatch) {
            res.status(400).json({ error: "Contraseña incorrecta" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.json({ message: "Inicio de sesión exitoso", token, user });
    }
    catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error en el inicio de sesión" });
    }
};
exports.login = login;
