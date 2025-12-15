import { WaiterRepository } from "../repositories/waiterRepository";

const waiterRepo = new WaiterRepository();

export class WaiterService {
    async getProfile(waiterId: string) {
    const waiter  = await waiterRepo.findById(waiterId);
    if (!waiter) throw new Error("Waiter not found");
    return waiter;
    }

    async getAllActiveWaiters() {
        return await waiterRepo.getAllActive();
    }

    async updateProfile(waiterId: string, data: any) {
        return await waiterRepo.update(waiterId, data);
    }
}