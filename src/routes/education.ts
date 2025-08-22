import { Router } from "express";
import {
  handleCreateEducation,
  handleDeleteEducation,
  handleGetEducations,
  handleUpdateEducation,
} from "../controllers/education";
import { authenticate } from "../middlewares/auth";
import { limiter } from "../middlewares/limiter";

const router = Router();

router.get("/:cv_id", limiter, authenticate, handleGetEducations);
router.post("/:cv_id", limiter, authenticate, handleCreateEducation);
router.put("/:id", limiter, authenticate, handleUpdateEducation);
router.delete("/:id", limiter, authenticate, handleDeleteEducation);

export default router;
