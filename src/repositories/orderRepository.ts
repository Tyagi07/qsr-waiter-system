import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderRepository {
  async create(data: any) {
    return prisma.order.create({
      data,
      include: { items: { include: { menuItem: true } } }
    });
  }

  async findById(id: string) {
    return prisma.order.findUnique({
      where: { id },
      include: { items: { include: { menuItem: true } }, table: true, waiter: true }
    });
  }

  async getTableOrders(tableId: string) {
    return prisma.order.findMany({
      where: { tableId },
      include: { items: { include: { menuItem: true } } },
      orderBy: { createdAt: "desc" }
    });
  }

  async getWaiterOrders(waiterId: string) {
    return prisma.order.findMany({
      where: { waiterId },
      include: { items: { include: { menuItem: true } }, table: true },
      orderBy: { createdAt: "desc" }
    });
  }

  async update(id: string, data: any) {
    return prisma.order.update({
      where: { id },
      data,
      include: { items: { include: { menuItem: true } } }
    });
  }

  async updateStatus(id: string, status: string) {
    return prisma.order.update({
      where: { id },
      data: { status }
    });
  }
}