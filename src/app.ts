
import educations from "./routes/education";
import express from "express"
import auth from "./routes/login-register"
import experience from "./routes/work-experiences"
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cv from "./routes/cv";

dotenv.config();

const app = express();
app.use(cookieParser());


app.use("/educations", educations);
app.use("/cv", cv);

app.use(express.json())

app.use("/auth", auth)
app.use("/experience", experience)

app.listen(process.env.PORT, () => {
  console.log(`Server is running on PORT ${process.env.PORT}`  );
});
