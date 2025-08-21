import { supabase } from "../client/supabase";

export const getUser = async (id: string) => {
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*, cv(*, education(*), work_experiences(*))")
    .eq("id", id)
    .single();

  if (userError) {
    throw new Error(userError.message);
  }

  return userData;
};

export const formDataUser = async (
  id: string,
  nickname: string,
  address: string,
  city: string,
  region: string
) => {
  if (!nickname || !address || !city || !region) {
    throw new Error("All fields are required");
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .update({
      nickname,
      address,
      city,
      region,
      //   birthdate: data.birthdate,
    })
    .eq("id", id)
    .select()
    .maybeSingle();

  if (userError) {
    throw new Error(userError.message);
  }

  return userData;
};
