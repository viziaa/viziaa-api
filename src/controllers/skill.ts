
import { Request, Response } from "express"
import { addSkill, deleteSkill, editSkill, getAllSkill, getDetailSkill } from "../services/skills";

export async function handlerGetAllSkill(req:Request, res:Response) {
    try{
        const cv_id = req.params.cv_id
        if(!cv_id) throw new Error("id CV tidak ditemukan")
        
        const data = await getAllSkill(cv_id)

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

export async function handlerGetDetailSkill(req:Request, res:Response) {
    try{
        const skill_id = req.params.expr_id
        if(!skill_id) throw new Error("id data Skill tidak ditemukan")
        
        const data = await getDetailSkill(skill_id)

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Data Detail Skill Berhasil ditemukan",
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

export async function handlerAddSkill(req:Request, res:Response) {
    try{
        const cv_id = req.params.cv_id
        if(!cv_id) throw new Error("id CV tidak ditemukan")
        const {skill_name, certified} = req.body
        const ability_level = Number(req.body.ability_level)
        if(!skill_name) throw new Error("input skill name tidak boleh kosong")
        if(!ability_level) throw new Error("input ability level tidak boleh kosong")
        if(!certified) throw new Error("input certified tidak boleh kosong")
        
        const data = await addSkill(cv_id, skill_name, ability_level, certified)

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Berhasil Menambahkan data Skill",
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

export async function handlerEditSkill(req:Request, res:Response) {
    try{
        const skill_id = req.params.expr_id
        if(!skill_id) throw new Error("id data Skill tidak ditemukan")
        const {skill_name, certified} = req.body
        const ability_level = Number(req.body.ability_level)
        const data = await editSkill(skill_id, skill_name, ability_level, certified)

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Berhasil Edit Data Skill",
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

export async function handlerDeleteSkill(req:Request, res:Response) {
    try{
        const skill_id = req.params.expr_id
        if(!skill_id) throw new Error("id data Skill tidak ditemukan")
        const data = await deleteSkill(skill_id)

        return res.status(200).json({
            code: 200,
            status: "success",
            message: "Berhasil Delete Data Skill",
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