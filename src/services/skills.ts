import { supabase } from "../client/supabase";

export async function getSkills(cv_id: string, userId: string) {
  const { data: cvData, error: cvError } = await supabase
    .from("cv")
    .select("*")
    .eq("id", cv_id)
    .single();

  if (cvError) throw new Error(cvError.message);
  if (cvData.created_by !== userId) throw new Error("Tidak memiliki akses");

  const { data, error } = await supabase
    .from("skills")
    .select()
    .eq("cv_id", cv_id);
  if (error) throw new Error(error.message);

  return data;
}

export async function getDetailSkill(id: string, userId: string) {
  const { data: skillData, error: skillError } = await supabase
    .from("skills")
    .select("*, cv(*)")
    .eq("id", id)
    .single();

  if (skillError) throw new Error(skillError.message);
  if (skillData.cv.created_by !== userId)
    throw new Error("Tidak memiliki akses");

  const { data, error } = await supabase
    .from("skills")
    .select()
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function addSkill(
  cv_id: string,
  skill_name: string,
  ability_level: string,
  certificate: string,
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
    .from("skills")
    .insert({
      cv_id,
      skill_name,
      ability_level,
      certificate,
      certified: certificate !== undefined ? true : false,
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function editSkill(
  id: string,
  skill_name: string,
  ability_level: number,
  certificate: string,
  userId: string
) {
  const { data: skillData, error: skillError } = await supabase
    .from("skills")
    .select("*, cv(*)")
    .eq("id", id)
    .single();

  if (skillError) throw new Error(skillError.message);
  if (skillData.cv.created_by !== userId)
    throw new Error("Tidak memiliki akses");

  const updatePayload: any = { skill_name, ability_level };

  if (certificate !== undefined) {
    updatePayload.certificate = certificate;
    updatePayload.certified = certificate.trim() === "" ? false : true;
  }

  const { data, error } = await supabase
    .from("skills")
    .update(updatePayload)
    .eq("id", id)
    .select()
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function deleteSkill(id: string, userId: string) {
  const { data: skillData, error: skillError } = await supabase
    .from("skills")
    .select("*, cv(*)")
    .eq("id", id)
    .single();

  if (skillError) throw new Error(skillError.message);
  if (skillData.cv.created_by !== userId)
    throw new Error("Tidak memiliki akses");

  const { error } = await supabase.from("skills").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
