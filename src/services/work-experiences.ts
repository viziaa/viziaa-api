import { supabase } from "../client/supabase";

export async function getWorkExperiences(cv_id: string, userId: string) {
  const { data: cvData, error: cvError } = await supabase
    .from("cv")
    .select("*")
    .eq("id", cv_id)
    .single();

  if (cvError) throw new Error(cvError.message);
  if (cvData.created_by !== userId) throw new Error("Tidak memiliki akses");

  const { data, error } = await supabase
    .from("work_experiences")
    .select()
    .eq("cv_id", cv_id);

  if (error) throw new Error(error.message);

  return data;
}

export async function getDetailWorkExperience(id: string, userId: string) {
  const { data, error } = await supabase
    .from("work_experiences")
    .select("*, cv(*)")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  if (data.cv.created_by !== userId) throw new Error("Tidak memiliki akses");

  return data;
}

export async function addWorkExperience(
  cv_id: string,
  corporate: string,
  date_in: Date,
  date_out: Date,
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
    .from("work_experiences")
    .insert({ cv_id, corporate, date_in, date_out })
    .select()
    .single();
  if (error) throw new Error(error.message);

  return data;
}

export async function editWorkExperience(
  id: string,
  corporate: string,
  date_in: Date,
  date_out: Date,
  userId: string
) {
  const { data: expData, error: expError } = await supabase
    .from("work_experiences")
    .select("*, cv(*)")
    .eq("id", id)
    .single();

  if (expError) throw new Error(expError.message);
  if (expData.cv.created_by !== userId) throw new Error("Tidak memiliki akses");

  const { data, error } = await supabase
    .from("work_experiences")
    .update({ corporate, date_in, date_out })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteWorkExperience(id: string, userId: string) {
  const { data: expData, error: expError } = await supabase
    .from("work_experiences")
    .select("*, cv(*)")
    .eq("id", id)
    .single();

  if (expError) throw new Error(expError.message);
  if (expData.cv.created_by !== userId) throw new Error("Tidak memiliki akses");

  const { error } = await supabase
    .from("work_experiences")
    .delete()
    .eq("id", id);

  if (error) throw new Error(error.message);
}
