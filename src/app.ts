// express
import express from "express";

import carsRouter from "./routers/carsRouter";

const PORT = 8080;
const baseUrl = "/api/v1";

const app = express();
app.use(express.json());

app.use(`${baseUrl}/cars"`, carsRouter);
// users

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
