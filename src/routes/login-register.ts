import express  from "express";
import { handlerLoginUser, handlerLogoutUser, handlerRegister } from "../controllers/login-register";
import { limiter } from "../middlewares/limiter";

const router = express.Router()

router.post("/register", limiter, handlerRegister)
router.post("/login", limiter, handlerLoginUser)
router.get("/logout", limiter, handlerLogoutUser)

export default router