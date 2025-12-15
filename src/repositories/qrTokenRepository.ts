import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class QRTokenRepository {
  async create(data: any) {
    return prisma.qRToken.create({ data });
  }

  async findByToken(token: string) {
    return prisma.qRToken.findUnique({
      where: { token },
      include: { waiter: true }
    });
  }

  async markAsUsed(id: string) {
    return prisma.qRToken.update({
      where: { id },
      data: { isUsed: true, usedAt: new Date() }
    });
  }
}