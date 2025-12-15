import { Router } from "express";
import authRoutes from "./authRoutes";
import waiterRoutes from "./waiterRoutes";
import floorRoutes from "./floorRoutes";
import tableRoutes from "./tableRoutes";
import menuRoutes from "./menuRoutes";
import orderRoutes from "./orderRoutes";

const router = Router();

router.use("/api/auth", authRoutes);
router.use("/api/waiters", waiterRoutes);
router.use("/api/floors", floorRoutes);
router.use("/api/tables", tableRoutes);
router.use("/api/menu", menuRoutes);
router.use("/api/orders", orderRoutes);

export default router;