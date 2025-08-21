import { Request, Response } from "express"
import { loginUser, registerUser } from "../services/login-register"
import { supabase } from "../client/supabase"


export async function handlerRegister(req:Request, res:Response){
    try{
        const { fullname, email, password} = req.body
        // if (!nickname) throw new Error ("nickname tidak boleh kosong")
        if(!fullname) throw new Error ("full name tidak boleh kosong")
        if(!email) throw new Error ("email tidak boleh kosong")
        if(!password) throw new Error ("password tidak boleh kosong")
        
        const data = await registerUser( fullname, email, password)

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Registrasi berhasil. Akun berhasil dibuat.",
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

export async function handlerLoginUser(req:Request, res:Response) {
    try{
        const{email, password} = req.body
        if (!email) throw new Error ("email tidak boleh kosong")
        if (!password) throw new Error ("password tidak boleh kosong")
        
        const result = await loginUser(email, password);
        

        res.cookie("sb-session", result.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 hari
        });

        return res.json({
        status: "success",
        message: "Login berhasil",
        data: result.dbData
        });

    } catch (err: any) {
        return res.status(500).json({
        code: 500,
        status: "error",
        message: err.message || "Invalid login",
        });       
    }
    
}


export const handlerLogoutUser = async (req: Request, res: Response) => {
  try {
    console.log("Session:", (req as any).session);
    if (!(req as any).session?.user) {
      return res.status(400).json({
        status: "error",
        message: "Tidak ada user yang sedang login",
      });
    }

    const { error } = await supabase.auth.signOut();
    if (error) {
      return res.status(400).json({
        status: "error",
        message: error.message,
      });
    }

    (req as any).session.destroy((err: any) => {
      if (err) {
        return res.status(500).json({
          status: "error",
          message: "Gagal menghapus session",
        });
      }

      return res.json({
        status: "success",
        message: "Logout berhasil",
      });
    });
  } catch (err: any) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};