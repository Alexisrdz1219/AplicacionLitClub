import express from "express";
import { getAllUsers, changeUserRole } from "../controllers/userController";
import { verifyToken, isAdmin } from "../middlewares/authMiddleware";

const router = express.Router();

router.get("/all", verifyToken, isAdmin, getAllUsers);
router.put("/role/:id", verifyToken, isAdmin, changeUserRole);


export default router;
