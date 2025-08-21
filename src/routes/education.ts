import { Router } from "express";
import { getEducations, createEducation } from "../controllers/education";

const router = Router();

router.get("/:cv_id", getEducations);
router.post("/:cv_id", createEducation);

export default router;
