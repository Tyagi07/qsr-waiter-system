import { Request, Response, NextFunction } from "express";
import { WaiterService } from "../services/waiterService";

const waiterService = new WaiterService();

export class WaiterController {
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      const waiter = await waiterService.getProfile(req.user!.id);
      res.json({
        success: true,
        message: "Profile fetched",
        data: waiter,
        statusCode: 200
      });
    } catch (error: any) {
      res.status(404).json({
        success: false,
        message: error.message,
        statusCode: 404
      });
    }
  }

  async getActive(req: Request, res: Response, next: NextFunction) {
    try {
      const waiters = await waiterService.getAllActiveWaiters();
      res.json({
        success: true,
        message: "Waiters fetched",
        data: waiters,
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
