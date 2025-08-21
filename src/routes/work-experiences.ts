import express  from "express";
import { limiter } from "../middlewares/limiter";
import { authenticate } from "../middlewares/auth";
import { handlerAddWorkExperiences, handlerDeleteWorkExperiences, handlerEditWorkExperiences, handlerGetAllWorkExperiences, handlerGetDetailWorkExperiences } from "../controllers/work-experiences";

const router = express.Router()

router.get("/:cv_id/all", limiter, authenticate, handlerGetAllWorkExperiences)
router.get("/:expr_id/detail", limiter, authenticate, handlerGetDetailWorkExperiences)
router.post("/:cv_id/new", limiter, authenticate, handlerAddWorkExperiences)
router.patch("/:expr_id/edit", limiter, authenticate, handlerEditWorkExperiences)
router.delete("/:expr_id/delete", limiter, authenticate, handlerDeleteWorkExperiences)

export default router