import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import authRoutes from "./routes/authRoutes";
import userRoutes from "./routes/userRoutes";
import bookRoutes from "./routes/bookRoutes";
import transactionRoutes from "./routes/transactionRoutes";

dotenv.config();

const app = express();

// 🔹 Configurar seguridad con Helmet
app.use(helmet());

// 🔹 Configurar CORS correctamente
app.use(cors({
  origin: "http://localhost:5173", // 🌍 Permitir solo el frontend local
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true // Habilitar credenciales si usas autenticación con cookies o tokens
}));

app.use(express.json());


// Definir rutas
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/transactions", transactionRoutes);

export default app;

