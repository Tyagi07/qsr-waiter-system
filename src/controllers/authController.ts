import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/authService";

const authService = new AuthService();

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const waiter = await authService.registerWaiter(req.body);
      res.status(201).json({
        success: true,
        message: "Waiter registered successfully",
        data: waiter,
        statusCode: 201
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
        statusCode: 400
      });
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;
      const result = await authService.loginWaiter(username, password);
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
        statusCode: 200
      });
    } catch (error: any) {
      res.status(401).json({
        success: false,
        message: error.message,
        statusCode: 401
      });
    }
  }

  async generateQR(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.user || !req.user.id) {
        return res.status(401).json({
          success: false,
          message: "User not authenticated. Please login first.",
          statusCode: 401
        });
      }

      const result = await authService.generateQRToken(req.user.id);
      res.status(200).json({
        success: true,
        message: "QR token generated",
        data: result,
        statusCode: 200
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
        statusCode: 400
      });
    }
  }

  async validateQR(req: Request, res: Response, next: NextFunction) {
    try {
      const { qrToken } = req.body;
      
      if (!qrToken) {
        return res.status(400).json({
          success: false,
          message: "QR token is required",
          statusCode: 400
        });
      }

      const result = await authService.validateQRToken(qrToken);
      res.status(200).json({
        success: true,
        message: "QR token validated",
        data: result,
        statusCode: 200
      });
    } catch (error: any) {
      res.status(400).json({
        success: false,
        message: error.message,
        statusCode: 400
      });
    }
  }
}