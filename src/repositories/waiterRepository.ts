import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class WaiterRepository {
    async findByUsername(username: string){
        return prisma.waiter.findUnique({
            where: { username }
        });
    }
  
    async findById(id: string){
        return prisma.waiter.findUnique({
            where: { id },
            include: { assignedTable: true, orders: true }
        });
    }
 

    async create(data: any){
        return prisma.waiter.create({data});
    }

    async getAllActive(){
        return prisma.waiter.findMany({
            where: { isActive: true},
            select: {
                id: true,
                username: true,
                firstName: true,
                lastName: true,
                email: true,
                assignedTable: true
            }
        });
    }

    async update(id: string, data: any){
        return prisma.waiter.update({
            where: {id},
            data
        });
    }
}