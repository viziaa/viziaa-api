import { supabase } from "../client/supabase";

export async function addSkill(
  cv_id: string,
  skill_name: string,
  ability_level: string,
  certificate: string
) {
  try {
    let result;
    const { data, error } = await supabase
      .from("skills")
      .insert({ cv_id, skill_name, ability_level, certificate })
      .select()
      .single();
    if (error) throw new Error(error.message);
    if (certificate !== "") {
      const { data: certData, error: certError } = await supabase
        .from("skills")
        .update({ certified: true })
        .eq("id", data.id)
        .select()
        .single();

      if (certError) throw new Error(certError.message);

      result = certData;
    }

    return result;
  } catch (err: any) {
    throw new Error(err.message || "Terjadi kesalahan");
  }
}

export async function getAllSkill(cv_id: string) {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select()
      .eq("cv_id", cv_id);
    if (error) throw new Error(error.message);
    if (!data || data.length === 0) throw new Error("Tidak ada data ditemukan");

    return { data };
  } catch (err: any) {
    throw new Error(err.message || "Terjadi kesalahan");
  }
}

export async function getDetailSkill(skill_id: string) {
  try {
    const { data, error } = await supabase
      .from("skills")
      .select()
      .eq("id", skill_id)
      .single();

    if (!data) throw new Error("Tidak ada data ditemukan");
    if (error) throw new Error(error.message);

    return { data };
  } catch (err: any) {
    throw new Error(err.message || "Terjadi kesalahan");
  }
}

export async function editSkill(
  skill_id: string,
  skill_name: string | null,
  ability_level: number | null,
  certified: boolean | null
) {
  try {
    let updateData: any = {};
    if (skill_name !== undefined && skill_name !== null)
      updateData.skill_name = skill_name;
    if (
      ability_level !== undefined &&
      ability_level !== null &&
      !Number.isNaN(ability_level)
    )
      updateData.ability_level = ability_level;
    if (certified !== undefined && certified !== null)
      updateData.certified = certified;

    const { data, error } = await supabase
      .from("skills")
      .update(updateData)
      .eq("id", skill_id)
      .select()
      .single();

    if (error) throw new Error(error.message);

    return { data };
  } catch (err: any) {
    throw new Error(err.message || "Terjadi kesalahan");
  }
}

export async function deleteSkill(skill_id: string) {
  try {
    const { data, error } = await supabase
      .from("skills")
      .delete()
      .eq("id", skill_id)
      .select();

    if (error) throw new Error(error.message);

    return {
      code: 200,
      status: "success",
      message: "Data skill berhasil dihapus",
      data,
    };
  } catch (err: any) {
    throw new Error(err.message || "Terjadi kesalahan saat menghapus data");
  }
}
