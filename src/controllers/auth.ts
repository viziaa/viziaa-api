import { Request, Response } from "express";
import { login, logout, register } from "../services/auth";
import { loginSchema, registerSchema } from "../validations/auth";

export async function handleRegister(req: Request, res: Response) {
  try {
    const { fullname, email, password } = req.body;

    const { error } = registerSchema.validate(req.body);
    if (error) throw new Error(error.message);

    const data = await register(fullname, email, password);

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Registrasi berhasil. Silahkan cek email anda untuk aktivasi",
      data,
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message || "Registrasi gagal",
    });
  }
}

export async function handleLogin(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const { error } = loginSchema.validate(req.body);
    if (error) throw new Error(error.message);

    const result = await login(email, password);

    res.cookie("sb-session", result.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 hari
    });

    return res.json({
      status: "success",
      message: "Login berhasil",
      data: result.dbData,
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message || "Login gagal",
    });
  }
}

export const handleLogout = async (req: Request, res: Response) => {
  try {
    const token = req.cookies["sb-session"];

    await logout(token);

    res.clearCookie("sb-session", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      code: 200,
      status: "success",
      message: "Logout berhasil",
    });
  } catch (err: any) {
    return res.status(500).json({
      code: 500,
      status: "error",
      message: err.message || "Kesalahan server",
    });
  }
};
