import { Request, Response, NextFunction } from "express";
import { OrderService } from "../services/orderServices";

const orderService = new OrderService();

export class OrderController {
  async createOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.createOrder(req.user!.id, req.body);
      res.status(201).json({
        success: true,
        message: "Order created",
        data: order,
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

  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.getOrderDetails(req.params.id);
      res.json({
        success: true,
        message: "Order fetched",
        data: order,
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

  async getTableOrders(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await orderService.getTableOrderHistory(req.params.tableId);
      res.json({
        success: true,
        message: "Orders fetched",
        data: orders,
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

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await orderService.updateOrderStatus(
        req.params.id,
        req.body.status
      );
      res.json({
        success: true,
        message: "Order status updated",
        data: order,
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