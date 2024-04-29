import express from "express";
import "dotenv/config";

import carsRouter from "./routers/carsRouter";
import authRouter from "./routers/authRouter";
import usersRouter from "./routers/usersRouter";
//import orderRouter from "./routers/orderRouter";
import cors from "cors";

const baseUrl = "/api/v1";

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://fs17-e-commerce-project.vercel.app/",
      "https://fs17-e-commerce-project.vercel.app/*",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(`${baseUrl}/cars`, carsRouter);
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/users`, usersRouter);
//app.use(`${baseUrl}/orders`, orderRouter);

export default app;
