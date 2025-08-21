import express  from "express";
import { handlerLoginUser, handlerRegister, logoutController } from "../controllers/login-register";
import { limiter } from "../middlewares/limiter";

const router = express.Router()

router.post("/register", limiter, handlerRegister)
router.post("/login", limiter, handlerLoginUser)
router.post("/logout", limiter, logoutController)

export default router