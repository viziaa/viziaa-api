import express  from "express";
import { limiter } from "../middlewares/limiter";
import { authenticate } from "../middlewares/auth";
import { handlerAddSkill, handlerDeleteSkill, handlerEditSkill, handlerGetAllSkill, handlerGetDetailSkill } from "../controllers/skill";

const router = express.Router()

router.get("/:cv_id/all", limiter, authenticate, handlerGetAllSkill)
router.get("/:expr_id/detail", limiter, authenticate, handlerGetDetailSkill)
router.post("/:cv_id/new", limiter, authenticate, handlerAddSkill)
router.patch("/:expr_id/edit", limiter, authenticate, handlerEditSkill)
router.delete("/:expr_id/delete", limiter, authenticate, handlerDeleteSkill)

export default router