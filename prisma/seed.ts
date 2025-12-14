import { PrismaClient } from "@prisma/client";
import bcryptjs from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log(" Seeding database...");

  try {
   
    await prisma.orderItem.deleteMany();
    await prisma.order.deleteMany();
    await prisma.qRToken.deleteMany();
    await prisma.table.deleteMany();
    await prisma.floor.deleteMany();
    await prisma.menuItem.deleteMany();
    await prisma.menuCategory.deleteMany();
    await prisma.waiter.deleteMany();

    const hashedPassword = await bcryptjs.hash("password123", 10);

    const floor1 = await prisma.floor.create({
      data: { floorName: "Ground Floor", floorNumber: 1, isActive: true }
    });

    const floor2 = await prisma.floor.create({
      data: { floorName: "First Floor", floorNumber: 2, isActive: true }
    });

    const floor3 = await prisma.floor.create({
      data: { floorName: "Second Floor", floorNumber: 3, isActive: true }
    });

    console.log(" Floors created");

    
    await prisma.waiter.create({
      data: {
        username: "john_waiter",
        email: "john@restaurant.com",
        password: hashedPassword,
        firstName: "John",
        lastName: "Smith",
        phoneNumber: "+91-9876543210"
      }
    });

    await prisma.waiter.create({
      data: {
        username: "priya_waiter",
        email: "priya@restaurant.com",
        password: hashedPassword,
        firstName: "Priya",
        lastName: "Singh",
        phoneNumber: "+91-9876543211"
      }
    });

    await prisma.waiter.create({
      data: {
        username: "raj_waiter",
        email: "raj@restaurant.com",
        password: hashedPassword,
        firstName: "Raj",
        lastName: "Patel",
        phoneNumber: "+91-9876543212"
      }
    });

    console.log(" Waiters created");

    
    const tables = [
      { tableNumber: "G-01", capacity: 2, floorId: floor1.id },
      { tableNumber: "G-02", capacity: 4, floorId: floor1.id },
      { tableNumber: "G-03", capacity: 6, floorId: floor1.id },
      { tableNumber: "G-04", capacity: 4, floorId: floor1.id },
      { tableNumber: "G-05", capacity: 2, floorId: floor1.id },
      { tableNumber: "F1-01", capacity: 4, floorId: floor2.id },
      { tableNumber: "F1-02", capacity: 6, floorId: floor2.id },
      { tableNumber: "F1-03", capacity: 2, floorId: floor2.id },
      { tableNumber: "F2-01", capacity: 8, floorId: floor3.id },
      { tableNumber: "F2-02", capacity: 4, floorId: floor3.id }
    ];

    for (const table of tables) {
      await prisma.table.create({
        data: { ...table, status: "vacant" }
      });
    }

    console.log(" Tables created");

  
    const cat1 = await prisma.menuCategory.create({
      data: { name: "Appetizers", description: "Starters", isActive: true }
    });

    const cat2 = await prisma.menuCategory.create({
      data: { name: "Main Course", description: "Main dishes", isActive: true }
    });

    const cat3 = await prisma.menuCategory.create({
      data: { name: "Desserts", description: "Sweet treats", isActive: true }
    });

    const cat4 = await prisma.menuCategory.create({
      data: { name: "Beverages", description: "Drinks", isActive: true }
    });

    const cat5 = await prisma.menuCategory.create({
      data: { name: "Breads", description: "Breads", isActive: true }
    });

    console.log("Categories created");

   
    const items = [
      { categoryId: cat1.id, name: "Paneer Tikka", description: "Grilled paneer", price: 250 },
      { categoryId: cat1.id, name: "Samosa", description: "Crispy pastry", price: 80 },
      { categoryId: cat1.id, name: "Spring Rolls", description: "Vegetable rolls", price: 120 },
      { categoryId: cat1.id, name: "Chicken Lollipop", description: "Spicy chicken", price: 200 },
      { categoryId: cat2.id, name: "Butter Chicken", description: "Creamy curry", price: 350 },
      { categoryId: cat2.id, name: "Paneer Butter Masala", description: "Paneer curry", price: 320 },
      { categoryId: cat2.id, name: "Biryani", description: "Rice with meat", price: 450 },
      { categoryId: cat2.id, name: "Dal Makhani", description: "Black lentils", price: 250 },
      { categoryId: cat2.id, name: "Tandoori Chicken", description: "Roasted chicken", price: 380 },
      { categoryId: cat3.id, name: "Gulab Jamun", description: "Sweet dessert", price: 120 },
      { categoryId: cat3.id, name: "Kheer", description: "Rice pudding", price: 100 },
      { categoryId: cat3.id, name: "Cheesecake", description: "Cheese dessert", price: 200 },
      { categoryId: cat4.id, name: "Lassi", description: "Yogurt drink", price: 80 },
      { categoryId: cat4.id, name: "Mango Shake", description: "Mango drink", price: 120 },
      { categoryId: cat4.id, name: "Coffee", description: "Hot coffee", price: 60 },
      { categoryId: cat5.id, name: "Naan", description: "Indian bread", price: 50 },
      { categoryId: cat5.id, name: "Roti", description: "Wheat bread", price: 30 }
    ];

    for (const item of items) {
      await prisma.menuItem.create({
        data: { ...item, isAvailable: true }
      });
    }

    console.log(" Menu items created");
    console.log(" Database seeded successfully!");
  } catch (error) {
    console.error(" Seeding error:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();