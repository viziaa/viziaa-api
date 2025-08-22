import { Request, Response } from "express";
import {
  addWorkExperience,
  deleteWorkExperience,
  editWorkExperience,
  getDetailWorkExperience,
  getWorkExperiences,
} from "../services/work-experiences";

export async function handlerGetWorkExperiences(req: Request, res: Response) {
  try {
    const cv_id = req.params.cv_id;
    const userId = (req as any).user?.id;

    if (!cv_id) return res.status(400).json({ message: "CV tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await getWorkExperiences(cv_id, userId);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data Work Experiences Berhasil ditemukan",
      data: data,
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message || "Invalid register",
    });
  }
}

export async function handleGetDetailWorkExperience(
  req: Request,
  res: Response
) {
  try {
    const id = req.params.id;
    const userId = (req as any).user?.id;

    if (!id) return res.status(400).json({ message: "CV tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await getDetailWorkExperience(id, userId);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data Detail Work Experiences Berhasil ditemukan",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message,
    });
  }
}

export async function handleAddWorkExperience(req: Request, res: Response) {
  try {
    const cv_id = req.params.cv_id;
    const userId = (req as any).user?.id;
    const { corporate, date_in, date_out } = req.body;

    if (!cv_id) return res.status(400).json({ message: "CV tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await addWorkExperience(
      cv_id,
      corporate,
      date_in,
      date_out,
      userId
    );

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Berhasil Menambahkan data Work Experience",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message,
    });
  }
}

export async function handleEditWorkExperience(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const userId = (req as any).user?.id;
    const { corporate, date_in, date_out } = req.body;

    if (!id) return res.status(400).json({ message: "CV tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await editWorkExperience(
      id,
      corporate,
      date_in,
      date_out,
      userId
    );

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Berhasil Edit Data Work Experience",
      data: data,
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message || "Invalid register",
    });
  }
}

export async function handleDeleteWorkExperience(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const userId = (req as any).user?.id;

    if (!id) return res.status(400).json({ message: "CV tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    await deleteWorkExperience(id, userId);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data Work Experience Berhasil Dihapus",
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message,
    });
  }
}
