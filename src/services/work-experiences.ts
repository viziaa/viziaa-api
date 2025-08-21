
import { supabase } from "../client/supabase";

export async function addWorkExperience(cv_id:string, corporate:string, date_in:Date, date_out:Date){
    try{
        const {data, error} = await supabase
        .from("work_experiences")
        .insert({cv_id, corporate, date_in, date_out})
        .select()
        .single()
        if (error) throw new Error(error.message)

        return {data}
    } catch (err:any) {throw new Error(err.message || "Terjadi kesalahan");}
}

export async function GetAllWorkExperience(cv_id:string){
    try{
        const { data, error } = await supabase
        .from("work_experiences")
        .select()
        .eq("cv_id", cv_id)
        if (error) throw new Error(error.message);
        if(!data || data.length===0) throw new Error("Tidak ada data ditemukan")
        
        return { data };
    } catch (err:any) {throw new Error(err.message || "Terjadi kesalahan");}
}

export async function GetDetailWorkExperience(experience_id:string){
    try{
        const { data, error } = await supabase
        .from("work_experiences")
        .select()
        .eq("id", experience_id)
        .single();

        if(!data) throw new Error("Tidak ada data ditemukan")
        if (error) throw new Error(error.message);

        return { data };
    } catch (err:any) {throw new Error(err.message || "Terjadi kesalahan");}
}

export async function editWorkExperience(experience_id:string, corporate:string |null, date_in:Date, date_out:Date | null){
    try{
        let updateData:any ={};
        if (corporate !== undefined && corporate !== null) updateData.corporate = corporate;
        if (date_in !== undefined && date_in !== null) updateData.date_in = date_in;
        if (date_out !== undefined && date_out !== null) updateData.date_out = date_out;

        
        
        const { data, error } = await supabase
        .from("work_experiences")
        .update(updateData)
        .eq("id", experience_id)
        .select()
        .single()

        if (error) throw new Error(error.message);
        
        return { data };
    } catch (err:any) {throw new Error(err.message || "Terjadi kesalahan");}
}

export async function deleteWorkExperience(experience_id: string) {
  try {
    const { data, error } = await supabase
      .from("work_experiences")
      .delete()
      .eq("id", experience_id)
      .select(); 

    if (error) throw new Error(error.message);

    return {
      code: 200,
      status: "success",
      message: "Work experience berhasil dihapus",
      data,
    };
  } catch (err: any) {
    throw new Error(err.message || "Terjadi kesalahan saat menghapus data");
  }
}