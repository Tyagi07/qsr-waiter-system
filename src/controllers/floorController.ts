import { Request, Response, NextFunction } from "express";
import { FloorService } from "../services/floorService";

const floorService = new FloorService();

export class FloorController {
  async getAllFloors(req: Request, res: Response, next: NextFunction) {
    try {
      const floors = await floorService.getAllFloors();
      res.json({
        success: true,
        message: "Floors fetched",
        data: floors,
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

  async getFloor(req: Request, res: Response, next: NextFunction) {
    try {
      const floor = await floorService.getFloorWithTables(req.params.id);
      res.json({
        success: true,
        message: "Floor fetched",
        data: floor,
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
}
