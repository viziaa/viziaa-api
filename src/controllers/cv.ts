import { Request, Response } from "express";
import {
  createCVService,
  deleteCVService,
  getCVsService,
  updateCVService,
} from "../services/cv";

export const getCVs = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id; // Ambil dari JWT middleware
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const cvs = await getCVsService(userId);
    res.status(200).json(cvs);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createCV = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { name, color, font } = req.body;
    if (!userId) return res.status(401).json({ message: "Unauthorized" });

    const newCV = await createCVService({
      name,
      color,
      font,
      created_by: userId,
    });

    res.status(201).json(newCV);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCV = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id!;

    const updatedCV = await updateCVService(id, req.body);
    res.status(200).json(updatedCV);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCV = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id!;

    await deleteCVService(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
