import express from "express";
import "dotenv/config";

import carsRouter from "./routers/carsRouter";
import authRouter from "./routers/authRouter";
import usersRouter from "./routers/usersRouter";
//import orderRouter from "./routers/orderRouter";
import cors from "cors";

const baseUrl = "/api/v1";

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN?.split(",");
console.log(allowedOrigins);
app.use(
  cors({
    origin: allowedOrigins,

    credentials: true,
  })
);

app.use(express.json());
app.use(`${baseUrl}/cars`, carsRouter);
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/users`, usersRouter);
//app.use(`${baseUrl}/orders`, orderRouter);

export default app;
