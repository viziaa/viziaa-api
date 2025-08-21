import { Request, Response } from "express";
import {
  getEducationsService,
  createEducationService,
} from "../services/educations";

export const getEducations = async (req: Request, res: Response) => {
  try {
    const { cv_id } = req.params;
    if (!cv_id) return res.status(400).json({ message: "cv_id is required" });

    const educations = await getEducationsService(cv_id as string);
    res.status(200).json(educations);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const createEducation = async (req: Request, res: Response) => {
  try {
    const { cv_id } = req.params;

    if (!cv_id) return res.status(400).json({ message: "cv_id is required" });

    const newEducation = await createEducationService({
      ...req.body,
      cv_id,
    });

    res.status(201).json(newEducation);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
