import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class TableRepository {
  async findById(id: string) {
    return prisma.table.findUnique({
      where: { id },
      include: { floor: true, assignedWaiter: true, orders: true }
    });
  }

  async findByFloorId(floorId: string) {
    return prisma.table.findMany({
      where: { floorId },
      include: { floor: true, assignedWaiter: true }
    });
  }

  async findByWaiterId(waiterId: string) {
    return prisma.table.findMany({
      where: { assignedWaiterId: waiterId },
      include: { floor: true }
    });
  }

  async assignWaiter(tableId: string, waiterId: string) {
    return prisma.table.update({
      where: { id: tableId },
      data: { assignedWaiterId: waiterId, status: "occupied" },
      include: { assignedWaiter: true }
    });
  }

  async unassignWaiter(tableId: string) {
    return prisma.table.update({
      where: { id: tableId },
      data: { assignedWaiterId: null, status: "vacant" }
    });
  }
}