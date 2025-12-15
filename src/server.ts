import app from "./app";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;


async function startServer(){
    try {
       await prisma.$connect();
       console.log("Database connected successfully");

       app.listen(PORT, ()=> {
        console.log(`Server running on http://localhost:${PORT}`);
       });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
}

startServer();

process.on("SIGINT", async()=> {
    console.log("\n shutting down...");
    await prisma.$disconnect();
    process.exit(0);
});