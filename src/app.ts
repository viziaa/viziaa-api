import express from "express"
import type { Request, Response } from "express"
import { supabase } from "./client/supabase"
import dotenv from "dotenv";

dotenv.config()

const app = express()

app.use(express.json())

app.get("/", (req:Request, res:Response) =>{
    res.send("Hello VIZIA")
})
app.get("/users", async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from("cv")        // nama tabel
      .select("*"); // kolom yang diambil

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, ()=> {
    console.log("Server is running")
})