import express from "express";
import { handleFormDataUser, handleGetUser } from "../controllers/user";
import { authenticate } from "../middlewares/auth";
import { limiter } from "../middlewares/limiter";

const router = express.Router();

router.get("/", limiter, authenticate, handleGetUser);
router.put("/data/:id", limiter, authenticate, handleFormDataUser);

export default router;
