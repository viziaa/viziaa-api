import { supabase } from "../client/supabase";

export interface Education {
  id?: string;
  cv_id: string;
  education_level: string;
  school_name: string;
  school_address: string;
  date_in: Date;
  date_out?: Date;
}

export async function getEducations(cv_id: string, userId: string) {
  const { data: cvData, error: cvError } = await supabase
    .from("cv")
    .select("*")
    .eq("id", cv_id)
    .single();

  if (cvError) throw new Error(cvError.message);
  if (cvData.created_by !== userId) throw new Error("Tidak memiliki akses");

  const { data: eduData, error: eduError } = await supabase
    .from("education")
    .select("*, cv(*)")
    .eq("cv_id", cv_id)
    .order("date_in", { ascending: false });

  if (eduError) throw new Error(eduError.message);
  return eduData;
}

export async function createEducation(
  education_level: string,
  school_name: string,
  school_address: string,
  date_in: Date,
  date_out: Date,
  cv_id: string,
  userId: string
) {
  const { data: cvData, error: cvError } = await supabase
    .from("cv")
    .select("*")
    .eq("id", cv_id)
    .single();

  if (cvError) throw new Error(cvError.message);
  if (cvData.created_by !== userId) throw new Error("Tidak memiliki akses");

  const { data, error } = await supabase
    .from("education")
    .insert({
      education_level,
      school_name,
      school_address,
      date_in,
      date_out,
      cv_id,
    })
    .select()
    .single();

  if(error) console.log(error.message)
  if (error) throw new Error (error.message);

  return data;
}

export async function updateEducation(
  id: string,
  education_level: string,
  school_name: string,
  school_address: string,
  date_in: Date,
  date_out: Date,
  userId: string
) {
  const { data: eduData, error: eduError } = await supabase
    .from("education")
    .select("*, cv(*)")
    .eq("id", id)
    .single();

  if (eduError) throw new Error(eduError.message);
  if (eduData.cv.created_by !== userId) throw new Error("Tidak memiliki akses");

  const { data, error } = await supabase
    .from("education")
    .update({
      education_level,
      school_name,
      school_address,
      date_in,
      date_out,
    })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteEducation(id: string, userId: string) {
  const { data: eduData, error: eduError } = await supabase
    .from("education")
    .select("*, cv(*)")
    .eq("id", id)
    .single();

  if (eduError) throw new Error(eduError.message);
  if (eduData.cv.created_by !== userId) throw new Error("Tidak memiliki akses");

  const { error } = await supabase.from("education").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
