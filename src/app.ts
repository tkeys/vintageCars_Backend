import express from 'express';
import dotenv from 'dotenv';

import carsRouter from './routers/carsRouter';
import authRouter from './routers/authRouter';
import usersRouter from './routers/usersRouter';

//const PORT = 8080;
const baseUrl = '/api/v1';

const app = express();
app.use(express.json());

dotenv.config({ path: '.env' });

app.use(`${baseUrl}/cars`, carsRouter);
app.use(`${baseUrl}/auth`, authRouter);
app.use(`${baseUrl}/users`, usersRouter);

export default app;
