import { FloorRepository } from "../repositories/floorRepository";

const floorRepo = new FloorRepository();

export class FloorService{
    async getAllFloors() {
        return await floorRepo.findAll();
    }

    async getFloorWithTables(floorId: string){
        const floor = await floorRepo.findById(floorId);
        if(!floor) throw new Error("Floor not found");
        return floor;
    }
}