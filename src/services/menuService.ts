import { MenuRepository } from "../repositories/menuRepository";

const menuRepo = new MenuRepository();

export class MenuService {
    async getAllCategories() {
        return await menuRepo.getAllCategories();
    }

    async getItemsByCategory(categoryId: string) {
        return await menuRepo.getItemsByCategory(categoryId);
    }

    async getItemDetails(itemId: string){
        const item = await menuRepo.getItemById(itemId);
        if (!item) throw new Error("Menu item not found");
        return item;
    }
}
