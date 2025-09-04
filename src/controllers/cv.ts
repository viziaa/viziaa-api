import dotenv from "dotenv";
import { Request, Response } from "express";
import {
  createCV,
  deleteCV,
  getCvById,
  getCVs,
  updateCV,
} from "../services/cv";
import { generatePdfFromUrl } from "../utils/puppeteer";

dotenv.config();

export async function handleGetCVs(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await getCVs(userId);
    res.status(200).json({
      code: 200,
      status: "success",
      message: "Berhasil mengambil CV",
      data,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: error.message });
  }
}

export async function handleCreateCV(req: Request, res: Response) {
  try {
    const userId = (req as any).user?.id;
    const { name, color, font } = req.body;
    if (!userId)
      return res.status(401).json({ message: "Tidak terotentikasi" });

    const data = await createCV(name, color, font, userId);

    res.status(201).json({
      code: 201,
      status: "success",
      message: "CV berhasil dibuat",
      data,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: error.message });
  }
}

export async function handleUpdateCV(req: Request, res: Response) {
  try {
    const id = req.params.id!;
    const userId = (req as any).user?.id;
    const { name, color, font } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ code: 400, status: "error", message: "CV tidak ditemukan" });
    }

    if (!userId) {
      return res.status(401).json({ message: "Tidak terotentikasi" });
    }

    const data = await updateCV(id, name, color, font, userId);
    res.status(200).json({
      code: 200,
      status: "success",
      message: "CV berhasil diupdate",
      data,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: error.message });
  }
}

export const handleDeleteCV = async (req: Request, res: Response) => {
  try {
    const id = req.params.id!;
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Tidak terotentikasi" });
    }

    await deleteCV(id, userId);

    res
      .status(200)
      .json({ code: 200, status: "success", message: "CV berhasil dihapus" });
  } catch (error: any) {
    res
      .status(500)
      .json({ code: 500, status: "error", message: error.message });
  }
};

export const handleDownloadCvPdf = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user.id; // dari middleware auth
    const cvId = req.params.cvId!;

    if (!userId) {
      return res.status(400).json({ error: "Tidak terotentikasi" });
    }

    // pastikan CV milik user
    await getCvById(userId, cvId);

    // URL frontend preview (tanpa toolbar, navbar, dll.)
    const previewUrl = `${process.env.CLIENT_URL}/cv/${cvId}/preview`;

    const token = req.cookies["sb-session"];
    if (!token) {
      return res.status(401).json({ error: "Tidak ada session" });
    }

    const pdfBuffer = await generatePdfFromUrl(previewUrl, token);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="cv-${cvId}.pdf"`
    );

    return res.send(pdfBuffer);
  } catch (err: any) {
    return res.status(500).json({ error: err.message });
  }
};
