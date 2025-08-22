import { Router } from "express";
import {
  handleCreateCV,
  handleDeleteCV,
  handleGetCVs,
  handleUpdateCV,
} from "../controllers/cv";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.get("/", authenticate, handleGetCVs);
router.post("/", authenticate, handleCreateCV);
router.put("/:id", authenticate, handleUpdateCV);
router.delete("/:id", authenticate, handleDeleteCV);

export default router;
