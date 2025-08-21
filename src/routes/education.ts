import { Router } from "express";
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education";
import { limiter } from "../middlewares/limiter";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.get("/:cv_id", limiter, authenticate, getEducations);
router.post("/:cv_id", limiter, authenticate, createEducation);
router.put("/:id", limiter, authenticate, updateEducation);
router.delete("/:id", limiter, authenticate, deleteEducation);

export default router;
