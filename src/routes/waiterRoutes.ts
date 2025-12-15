import { Router } from "express";
import { WaiterController } from "../controllers/waiterController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const waiterController = new WaiterController();

router.use(authMiddleware);

router.get("/profile", (req, res, next) =>
  waiterController.getProfile(req, res, next)
);

router.get("/active", (req, res, next) =>
  waiterController.getActive(req, res, next)
);

export default router;
