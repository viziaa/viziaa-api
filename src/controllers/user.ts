import { Request, Response } from "express";
import { formDataUser, getUser } from "../services/user";

export const handleGetUser = async (req: Request, res: Response) => {
  try {
    const id = (req as any).user.id;
    const user = await getUser(id);
    res.status(200).json(user);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const handleFormDataUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nickname, address, city, region, birthdate } = req.body;

    if (!id) {
      return res.status(400).json({ error: "id is required" });
    }

    const result = await formDataUser(
      id,
      nickname,
      address,
      city,
      region,
      birthdate
    );
    res.status(200).json(result);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
