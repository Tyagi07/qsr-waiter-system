import { TableRepository } from "../repositories/tableRepository";

const tableRepo = new TableRepository();

export class TableService {
  async getTablesByFloor(floorId: string) {
    return await tableRepo.findByFloorId(floorId);
  }

  async getTableDetails(tableId: string) {
    const table = await tableRepo.findById(tableId);
    if (!table) throw new Error("Table not found");
    return table;
  }

  async assignTableToWaiter(tableId: string, waiterId: string) {
    const table = await tableRepo.findById(tableId);
    if (!table) throw new Error("Table not found");
    if (table.assignedWaiterId) throw new Error("Table already assigned");

    return await tableRepo.assignWaiter(tableId, waiterId);
  }

  async getWaiterAssignedTables(waiterId: string) {
    return await tableRepo.findByWaiterId(waiterId);
  }
}
