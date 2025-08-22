import { Request, Response } from "express";
import { formDataUser, getDataUser } from "../services/user";

export const handleGetDataUser = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user.id;

    if (!id) {
      return res.status(400).json({ error: "Tidak terotentikasi" });
    }

    const user = await getDataUser(id);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const handleFormDataUser = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user.id;
    const { nickname, phone, about, address, city, region, birthdate } =
      req.body;

    if (!id) {
      return res.status(400).json({ error: "Tidak terotentikasi" });
    }

    const avatar = req.file!.path;

    const result = await formDataUser(
      id,
      avatar,
      nickname,
      about,
      Number(phone),
      address,
      city,
      region,
      birthdate
    );
    res
      .status(200)
      .json({ code: 200, status: "success", message: "success", result });
  } catch (err: any) {
    res.status(500).json({ code: 500, status: "error", error: err.message });
  }
};
