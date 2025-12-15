import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class FloorRepository {
    async findAll(){
        return prisma.floor.findMany({
            where: { isActive: true },
            include: { tables: true }
        });
    }

    async findById(id: string){
        return prisma.floor.findUnique({
            where : { id },
            include: { tables: true }
        });
    }

    async create(data: any){
        return prisma.floor.create({ data });
    }
}