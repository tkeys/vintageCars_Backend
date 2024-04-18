import express from "express";
import "dotenv/config";

import carsRouter from "./routers/carsRouter";
import authRouter from "./routers/authRouter";
import usersRouter from "./routers/usersRouter";
import cors from "cors";

const baseUrl = "/api/v1";

const app = express();
app.use(cors());

app.use(express.json());
app.use(`${baseUrl}/cars`, carsRouter);
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/users`, usersRouter);

export default app;
