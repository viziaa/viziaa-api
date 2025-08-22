import express from "express";
import { handleFormDataUser, handleGetDataUser } from "../controllers/user";
import { authenticate } from "../middlewares/auth";
import { limiter } from "../middlewares/limiter";
import { upload } from "../utils/multer";

const router = express.Router();

router.get("/", limiter, authenticate, handleGetDataUser);
router.put(
  "/data",
  limiter,
  authenticate,
  upload.single("avatar"),
  handleFormDataUser
);

export default router;
