import { Request, Response } from "express";
import {
  getEducationsService,
  createEducationService,
  updateEducationService,
  deleteEducationService,
} from "../services/educations";
import { error } from "console";

export const getEducations = async (req: Request, res: Response) => {
  try {
    const { cv_id } = req.params;
    if (!cv_id) return res.status(400).json({ message: "cv_id is required" });

    const educations = await getEducationsService(cv_id);
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

export const updateEducation = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id!;
    const updatedEducation = await updateEducationService(id, req.body);
    res.status(200).json({
      message: "Update berhasil",
      data: updatedEducation,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteEducation = async (req: Request, res: Response) => {
  try {
    const id: string = req.params.id!;

    await deleteEducationService(id);
    res.status(200).json({
      message: "Delete berhasil",
      data: deleteEducation,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
