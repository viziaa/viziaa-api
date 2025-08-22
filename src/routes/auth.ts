import express from "express";
import { handleLogin, handleLogout, handleRegister } from "../controllers/auth";
import { limiter } from "../middlewares/limiter";

const router = express.Router();

router.post("/register", limiter, handleRegister);
router.post("/login", limiter, handleLogin);
router.post("/logout", limiter, handleLogout);

export default router;
