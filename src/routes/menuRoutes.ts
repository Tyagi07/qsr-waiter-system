import { Router } from "express";
import { MenuController } from "../controllers/menuController";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();
const menuController = new MenuController();

router.use(authMiddleware);

router.get("/categories", (req, res, next) =>
  menuController.getCategories(req, res, next)
);

router.get("/categories/:categoryId/items", (req, res, next) =>
  menuController.getCategoryItems(req, res, next)
);

router.get("/items/:itemId", (req, res, next) =>
  menuController.getItem(req, res, next)
);

export default router;