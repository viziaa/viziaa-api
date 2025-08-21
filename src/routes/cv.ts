import { Router } from "express";
import { getCVs, createCV, updateCV, deleteCV } from "../controllers/cv";
import { authenticate } from "../middlewares/auth";

const router = Router();

router.get("/", authenticate, getCVs);
router.post("/", authenticate, createCV);
router.put("/:id", authenticate, updateCV);
router.delete("/:id", authenticate, deleteCV);

export default router;
