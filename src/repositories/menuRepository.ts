import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class MenuRepository {
  async getAllCategories() {
    return prisma.menuCategory.findMany({
      where: { isActive: true },
      include: { items: { where: { isAvailable: true } } }
    });
  }

  async getItemsByCategory(categoryId: string) {
    return prisma.menuItem.findMany({
      where: { categoryId, isAvailable: true }
    });
  }

  async getItemById(id: string) {
    return prisma.menuItem.findUnique({
      where: { id },
      include: { category: true }
    });
  }

  async createCategory(data: any) {
    return prisma.menuCategory.create({ data });
  }

  async createMenuItem(data: any) {
    return prisma.menuItem.create({ data });
  }
}