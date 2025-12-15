import { Request, Response, NextFunction } from "express";
import { MenuService } from "../services/menuService";

const menuService = new MenuService();

export class MenuController {
  async getCategories(req: Request, res: Response, next: NextFunction) {
    try {
      const categories = await menuService.getAllCategories();
      res.json({
        success: true,
        message: "Categories fetched",
        data: categories,
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

  async getCategoryItems(req: Request, res: Response, next: NextFunction) {
    try {
      const items = await menuService.getItemsByCategory(req.params.categoryId);
      res.json({
        success: true,
        message: "Items fetched",
        data: items,
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

  async getItem(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await menuService.getItemDetails(req.params.itemId);
      res.json({
        success: true,
        message: "Item fetched",
        data: item,
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
