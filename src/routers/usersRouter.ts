import express from "express";

// ANDREA'S DEMO CODE

import { getAllUsers } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers);

export default router;
