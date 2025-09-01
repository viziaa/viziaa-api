import { Request, Response } from "express";
import {
  createEducation,
  deleteEducation,
  getEducations,
  updateEducation,
} from "../services/educations";

export async function handleGetEducations(req: Request, res: Response) {
  try {
    const { cv_id } = req.params;
    const userId = (req as any).user?.id;
    if (!cv_id) return res.status(400).json({ message: "CV tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await getEducations(cv_id, userId);
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Berhasil mengambil data pendidikan",
      data,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: error.message });
  }
}

export async function handleCreateEducation(req: Request, res: Response) {
  try {
    const { cv_id } = req.params;
    const userId = (req as any).user?.id;
    const { education_level, school_name, school_address, date_in, date_out } =
      req.body;
    if (!cv_id) return res.status(400).json({ message: "CV tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });
    const data = await createEducation(
      education_level,
      school_name,
      school_address,
      date_in,
      date_out,
      cv_id,
      userId
    );

    res.status(201).json({
      code: 201,
      status: "success",
      message: "Pendidikan berhasil dibuat",
      data,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: error.message });
  }
}

export async function handleUpdateEducation(req: Request, res: Response) {
  try {
    const id = req.params.id!;
    const userId = (req as any).user?.id;
    const { education_level, school_name, school_address, date_in, date_out } =
      req.body;

    if (!id)
      return res.status(400).json({ message: "Pendidikan tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });
    const data = await updateEducation(
      id,
      education_level,
      school_name,
      school_address,
      date_in,
      date_out,
      userId
    );
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Update data pendidikan berhasil",
      data,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: error.message });
  }
}

export async function handleDeleteEducation(req: Request, res: Response) {
  try {
    const id: string = req.params.id!;
    const userId = (req as any).user?.id;
    if (!id)
      return res.status(400).json({ message: "Pendidikan tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    await deleteEducation(id, userId);
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Pendidikan berhasil dihapus",
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: error.message });
  }
}
