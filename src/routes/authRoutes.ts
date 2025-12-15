import {Router} from "express";
import { AuthController } from "../controllers/authController";
import { validateRequest } from "../middleware/authMiddleware";
import { LoginSchema, CreateWaiterSchema } from "../schemas/validationSchemas";

const router = Router();
const authController = new AuthController();

router.post("/register", validateRequest(CreateWaiterSchema), (req, res, next)=> 
    authController.register(req, res, next)
);

router.post("/login", validateRequest(LoginSchema), (req, res, next)=>
    authController.login(req, res, next)
);

router.post("/generate-qr", (req, res, next)=> 
    authController.generateQR(req, res, next)
);

router.post("/validate-qr", (req, res, next)=> 
    authController.validateQR(req, res, next)
);

export default router;