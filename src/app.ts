import express from "express";
import type { Request, Response } from "express";
import session from "express-session";
import { supabase } from "./client/supabase";
import auth from "./routes/login-register";
import educations from "./routes/education";
import dotenv from "dotenv";
import { authenticate } from "./middlewares/auth";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(cookieParser());

app.use(express.json());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "rahasia_super_aman",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      httpOnly: true,
      sameSite: "lax",
      maxAge: 86400000,
    },
  })
);

app.get("/", authenticate, (req: Request, res: Response) => {
  res.send("Hello VIZIA");
});
app.get("/users", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("cv") // nama tabel
      .select("*"); // kolom yang diambil

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/auth", auth);
app.use("/educations", educations);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
