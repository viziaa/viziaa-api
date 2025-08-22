import express from "express";
import {
  handleAddSkill,
  handleDeleteSkill,
  handleEditSkill,
  handleGetDetailSkill,
  handleGetSkills,
} from "../controllers/skill";
import { authenticate } from "../middlewares/auth";
import { limiter } from "../middlewares/limiter";

const router = express.Router();

router.get("/:cv_id", limiter, authenticate, handleGetSkills);
router.get("/:id/detail", limiter, authenticate, handleGetDetailSkill);
router.post("/:cv_id", limiter, authenticate, handleAddSkill);
router.put("/:id/edit", limiter, authenticate, handleEditSkill);
router.delete("/:id/delete", limiter, authenticate, handleDeleteSkill);

export default router;
