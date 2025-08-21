import { NextFunction, Request, Response } from "express";
import { supabase } from "../client/supabase";
import { error } from "console";


export async function authenticate(req:Request, res:Response, next:NextFunction) {
    
       

    try{
         const token = req.cookies["sb-session"]
    
        if(!token){
            return res.status(401).json({message:"Unauthorized"});
            
        }

        const {
            data: {user},error 
        } = await supabase.auth.getUser(token)

        if (error||!user) {
            return res.status(400).json({
                code:400,
                status:"error",
                message:"invalid or expired session"
            })
        }
        (req as any).user = user
        next()
    } catch (err) {
        return res.status(500).json({
                code:500,
                status:"error",
                message:"i",
                error:err
            })
    }

        
}