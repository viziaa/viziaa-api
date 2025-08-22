import express from "express";
import {
  handleAddWorkExperience,
  handleDeleteWorkExperience,
  handleEditWorkExperience,
  handleGetDetailWorkExperience,
  handlerGetWorkExperiences,
} from "../controllers/work-experiences";
import { authenticate } from "../middlewares/auth";
import { limiter } from "../middlewares/limiter";

const router = express.Router();

router.get("/:cv_id", limiter, authenticate, handlerGetWorkExperiences);
router.get("/:id/detail", limiter, authenticate, handleGetDetailWorkExperience);
router.post("/:cv_id", limiter, authenticate, handleAddWorkExperience);
router.put("/:id", limiter, authenticate, handleEditWorkExperience);
router.delete("/:id", limiter, authenticate, handleDeleteWorkExperience);

export default router;
