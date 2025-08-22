import { supabase } from "../client/supabase";

export async function getDataUser(id: string) {
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*, cv(*, education(*), work_experiences(*), skills(*))")
    .eq("id", id)
    .single();

  if (userError) {
    throw new Error(userError.message);
  }

  return userData;
}

export async function formDataUser(
  id: string,
  avatar: string,
  nickname: string,
  about: string,
  phone: number,
  address: string,
  city: string,
  region: string,
  birthdate: Date
) {
  if (
    !avatar ||
    !nickname ||
    !phone ||
    !about ||
    !address ||
    !city ||
    !region
  ) {
    throw new Error("Data tidak boleh kosong");
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .update({
      avatar,
      nickname,
      about,
      phone,
      address,
      city,
      region,
      birthdate,
    })
    .eq("id", id)
    .select()
    .single();

  if (userError) {
    throw new Error(userError.message);
  }

  return userData;
}
