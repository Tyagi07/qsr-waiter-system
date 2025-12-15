import { Router } from "express";
import { TableController } from "../controllers/tableController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const tableController = new TableController();

router.use(authMiddleware);

router.get("/floor/:floorId", (req, res, next) =>
  tableController.getFloorTables(req, res, next)
);

router.post("/:tableId/assign", (req, res, next) =>
  tableController.assignTable(req, res, next)
);

export default router;