import { Router } from "express";
import authRoutes from "./auth";
import urlRoutes from "./urls";

const router = Router();

router.use("/auth", authRoutes);
router.use("/urls", urlRoutes);

export default router;
