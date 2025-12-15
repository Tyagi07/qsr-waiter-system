import { OrderRepository } from "../repositories/orderRepository";
import { TableRepository } from "../repositories/tableRepository";
import { MenuRepository } from "../repositories/menuRepository";
import { PrismaClient } from "@prisma/client";

const orderRepo = new OrderRepository();
const tableRepo = new TableRepository();
const menuRepo = new MenuRepository();
const prisma = new PrismaClient();

export class OrderService {
  async createOrder(waiterId: string, data: any) {
    const table = await tableRepo.findById(data.tableId);
    if (!table) throw new Error("Table not found");
    if (table.assignedWaiterId !== waiterId) throw new Error("You can only create orders for your assigned tables");

    for (const item of data.items) {
      const menuItem = await menuRepo.getItemById(item.menuItemId);
      if (!menuItem) throw new Error(`Menu item not found`);
      if (!menuItem.isAvailable) throw new Error(`${menuItem.name} is not available`);
    }

    let totalAmount = 0;
    const orderItems = [];

    for (const item of data.items) {
      const menuItem = await menuRepo.getItemById(item.menuItemId);
      const itemTotal = menuItem!.price * item.quantity;
      totalAmount += itemTotal;

      orderItems.push({
        menuItemId: item.menuItemId,
        quantity: item.quantity,
        unitPrice: menuItem!.price,
        totalPrice: itemTotal,
        instructions: item.instructions
      });
    }

    const orderNumber = `ORD-${Date.now()}`;

    return await prisma.order.create({
      data: {
        orderNumber,
        tableId: data.tableId,
        waiterId,
        totalAmount,
        specialInstructions: data.specialInstructions,
        items: { create: orderItems }
      },
      include: { items: { include: { menuItem: true } } }
    });
  }

  async getOrderDetails(orderId: string) {
    const order = await orderRepo.findById(orderId);
    if (!order) throw new Error("Order not found");
    return order;
  }

  async getTableOrderHistory(tableId: string) {
    return await orderRepo.getTableOrders(tableId);
  }

  async updateOrderStatus(orderId: string, status: string) {
    const validStatuses = ["pending", "confirmed", "preparing", "ready", "served"];
    if (!validStatuses.includes(status)) throw new Error("Invalid status");

    return await orderRepo.updateStatus(orderId, status);
  }
}
