import express from "express";
import "dotenv/config";

import carsRouter from "./routers/carsRouter";
import authRouter from "./routers/authRouter";

const PORT = 8080;
const baseUrl = "/api/v1";

const app = express();
app.use(express.json());

app.use(`${baseUrl}/cars`, carsRouter);
app.use(`${baseUrl}/auth`, authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
