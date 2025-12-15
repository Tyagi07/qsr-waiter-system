import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes";
import { errorHandler } from "./middleware/errorHandler";

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.get("/health", (req: Request, res: Response) => {
  res.json({ status: "OK", message: "Server is running" });
});

app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
    statusCode: 404
  });
});

app.use(errorHandler);

export default app;