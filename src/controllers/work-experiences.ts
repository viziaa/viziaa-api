
import { Request, Response } from "express"
import { addWorkExperience, deleteWorkExperience, editWorkExperience, GetAllWorkExperience, GetDetailWorkExperience } from "../services/work-experiences";

export async function handlerGetAllWorkExperiences(req:Request, res:Response) {
    try{
        const cv_id = req.params.cv_id
        if(!cv_id) throw new Error("id CV tidak ditemukan")
        
        const data = await GetAllWorkExperience(cv_id)

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

export async function handlerGetDetailWorkExperiences(req:Request, res:Response) {
    try{
        const experience_id = req.params.expr_id
        if(!experience_id) throw new Error("id data Work Experience tidak ditemukan")
        
        const data = await GetDetailWorkExperience(experience_id)

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Data Detail Work Experiences Berhasil ditemukan",
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

export async function handlerAddWorkExperiences(req:Request, res:Response) {
    try{
        const cv_id = req.params.cv_id
        if(!cv_id) throw new Error("id CV tidak ditemukan")
        const {corporate} = req.body
        const date_in = new Date (req.body.date_in)
        const date_out = new Date (req.body.date_out)
        if(!corporate) throw new Error("input corporate tidak boleh kosong")
        if(!date_in) throw new Error("input date in tidak boleh kosong")
        if(!date_out) throw new Error("input date out tidak boleh kosong")
        
        const data = await addWorkExperience(cv_id, corporate, date_in, date_out)

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Berhasil Menambahkan data Work Experience",
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

export async function handlerEditWorkExperiences(req:Request, res:Response) {
    try{
        const experience_id = req.params.expr_id
        if(!experience_id) throw new Error("id data Work Experience tidak ditemukan")
        const {corporate, date_in, date_out} = req.body
        const data = await editWorkExperience(experience_id, corporate, date_in, date_out)

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

export async function handlerDeleteWorkExperiences(req:Request, res:Response) {
    try{
        const experience_id = req.params.expr_id
        if(!experience_id) throw new Error("id data Work Experience tidak ditemukan")
        const data = await deleteWorkExperience(experience_id)

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Berhasil Delete Data Work Experience",
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