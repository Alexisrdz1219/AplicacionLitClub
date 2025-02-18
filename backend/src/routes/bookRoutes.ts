import express from "express";
import { getAllBooks, addBook, updateBook, deleteBook } from "../controllers/bookController";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/", getAllBooks); // Abierto para todos
router.post("/", verifyToken, isAdmin, addBook); // Solo admin
router.put("/:id", verifyToken, isAdmin, updateBook); // Solo admin
router.delete("/:id", verifyToken, isAdmin, deleteBook); // Solo admin

export default router;
