import { Router } from "express";
import { FloorController } from "../controllers/floorController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const floorController = new FloorController();

router.use(authMiddleware);

router.get("/", (req, res, next) =>
  floorController.getAllFloors(req, res, next)
);

router.get("/:id", (req, res, next) =>
  floorController.getFloor(req, res, next)
);

export default router;