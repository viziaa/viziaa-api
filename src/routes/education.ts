import { Router } from "express";
import {
  getEducations,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education";

const router = Router();

router.get("/:cv_id", getEducations);
router.post("/:cv_id", createEducation);
router.put("/:id", updateEducation);
router.delete("/:id", deleteEducation);

export default router;
