import express from "express";
import { createTransaction, getUserBooks, returnBook } from "../controllers/transactionController";
import { verifyToken } from "../middlewares/authMiddleware";

const router = express.Router();

router.post("/", verifyToken, createTransaction);
router.get("/:usuario_id", verifyToken, getUserBooks);
router.put("/return/:transaction_id", verifyToken, returnBook);

export default router;
