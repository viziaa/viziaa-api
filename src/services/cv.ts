import { supabase } from "../client/supabase";

export async function getCVs(userId: string) {
  const { data, error } = await supabase
    .from("cv")
    .select("*, education(*), work_experiences(*), skills(*)")
    .eq("created_by", userId);

  if (error) throw new Error(error.message);

  return data;
}

export async function getCvById(userId: string, cvId: string) {
  const { data, error } = await supabase
    .from("cv")
    .select("*")
    .eq("id", cvId)
    .single();

  if (error) throw new Error(error.message);
  if (data.created_by !== userId) throw new Error("Tidak memiliki akses");

  return data;
}

export async function createCV(
  name: string,
  color: string,
  font: string,
  userId: string
) {
  const { data, error } = await supabase
    .from("cv")
    .insert({ name, color, font, created_by: userId })
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function updateCV(
  id: string,
  name: string,
  color: string,
  font: string,
  userId: string
) {
  const { data: cvData, error: cvError } = await supabase
    .from("cv")
    .select("*")
    .eq("id", id)
    .single();

  if (cvError) throw new Error(cvError.message);
  if (cvData.created_by !== userId) throw new Error("Tidak memiliki akses");

  const { data, error } = await supabase
    .from("cv")
    .update({ name, color, font })
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export async function deleteCV(id: string, userId: string) {
  const { data: cvData, error: cvError } = await supabase
    .from("cv")
    .select("*")
    .eq("id", id)
    .single();

  if (cvError) throw new Error(cvError.message);
  if (cvData.created_by !== userId) throw new Error("Tidak memiliki akses");
  const { error } = await supabase.from("cv").delete().eq("id", id);
  if (error) throw new Error(error.message);
}
