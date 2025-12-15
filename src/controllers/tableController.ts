import { Request, Response, NextFunction } from "express";
import { TableService } from "../services/tableService";

const tableService = new TableService();

export class TableController {
  async getFloorTables(req: Request, res: Response, next: NextFunction) {
    try {
      const tables = await tableService.getTablesByFloor(req.params.floorId);
      res.json({
        success: true,
        message: "Tables fetched",
        data: tables,
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

  async assignTable(req: Request, res: Response, next: NextFunction) {
    try {
      const table = await tableService.assignTableToWaiter(
        req.params.tableId,
        req.user!.id
      );
      res.json({
        success: true,
        message: "Table assigned",
        data: table,
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
