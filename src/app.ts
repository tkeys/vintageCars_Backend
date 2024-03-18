import express, { Request, Response } from "express";
import dotenv from "dotenv";

import productsRouter from "./routers/productsRouter";
import usersRouter from "./routers/usersRouter";

const app = express();
app.use(express.json());

dotenv.config({ path: ".env" });

app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);

export default app;
