import { Request, Response } from "express";
import {
  addSkill,
  deleteSkill,
  editSkill,
  getDetailSkill,
  getSkills,
} from "../services/skills";

export async function handleGetSkills(req: Request, res: Response) {
  try {
    const cv_id = req.params.cv_id!;
    const userId = (req as any).user?.id;

    if (!cv_id) return res.status(400).json({ message: "CV tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await getSkills(cv_id, userId);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data Skills Berhasil ditemukan",
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

export async function handleGetDetailSkill(req: Request, res: Response) {
  try {
    const id = req.params.id!;
    const userId = (req as any).user?.id;

    if (!id) return res.status(400).json({ message: "Skill tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await getDetailSkill(id, userId);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data Detail Skill Berhasil ditemukan",
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

export async function handleAddSkill(req: Request, res: Response) {
  try {
    const cv_id = req.params.cv_id!;
    const userId = (req as any).user?.id;
    const { skill_name, ability_level, certificate } = req.body;

    if (!cv_id) return res.status(400).json({ message: "CV tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await addSkill(
      cv_id,
      skill_name,
      ability_level,
      certificate,
      userId
    );

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Berhasil Menambahkan data Skill",
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

export async function handleEditSkill(req: Request, res: Response) {
  try {
    const id = req.params.id!;
    const userId = (req as any).user?.id;
    const { skill_name, ability_level, certificate } = req.body;

    if (!id) return res.status(400).json({ message: "Skill tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await editSkill(
      id,
      skill_name,
      ability_level,
      certificate,
      userId
    );

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Berhasil Edit Data Skill",
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

export async function handleDeleteSkill(req: Request, res: Response) {
  try {
    const id = req.params.id!;
    const userId = (req as any).user?.id;

    if (!id) return res.status(400).json({ message: "Skill tidak ditemukan" });
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    await deleteSkill(id, userId);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Data Skill Berhasil dihapus",
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message,
    });
  }
}
