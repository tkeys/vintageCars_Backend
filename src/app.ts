import express from "express";
import "dotenv/config";

import carsRouter from "./routers/carsRouter";
import authRouter from "./routers/authRouter";
import usersRouter from "./routers/usersRouter";
//import orderRouter from "./routers/orderRouter";
import cors from "cors";

const baseUrl = "/api/v1";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "https://fs17-e-commerce-project.vercel.app/",
];
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy violation"));
      }
    },
    /* origin: [
      "http://localhost:3000",
      "https://fs17-e-commerce-project.vercel.app/api/v1",
    ], */
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Origin",
      "X-Requested-With",
      "Accept",
      "x-client-key",
      "x-client-token",
      "x-client-secret",
      "Authorization",
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
