import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";
import { corsMiddleware } from "./middlewares/cors";
import cv from "./routes/cv";
import educations from "./routes/education";
import auth from "./routes/login-register";
import user from "./routes/user";
import experience from "./routes/work-experiences";
import skill from "./routes/skill"

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(corsMiddleware);

app.use("/educations", educations);
app.use("/cv", cv);
app.use("/auth", auth);
app.use("/experiences", experience);
app.use("/skill", skill)
app.use("/user", user);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`);
});
