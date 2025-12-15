import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { authMiddleware } from "../middleware/authMiddleware";
import { validateRequest } from "../middleware/authMiddleware";
import { CreateOrderSchema, UpdateOrderStatusSchema } from "../schemas/validationSchemas";

const router = Router();
const orderController = new OrderController();

router.use(authMiddleware);

router.post("/", validateRequest(CreateOrderSchema), (req, res, next) =>
  orderController.createOrder(req, res, next)
);

router.get("/:id", (req, res, next) =>
  orderController.getOrder(req, res, next)
);

router.get("/table/:tableId", (req, res, next) =>
  orderController.getTableOrders(req, res, next)
);

router.patch("/:id/status", validateRequest(UpdateOrderStatusSchema), (req, res, next) =>
  orderController.updateOrderStatus(req, res, next)
);

export default router;