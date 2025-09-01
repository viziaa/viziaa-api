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
      fullname: string,
      nickname: string,
      about: string,
      phone: number,
      address: string,
      city: string,
      region: string,
      birthdate: Date
    ) {
      if (
        !fullname ||
        !nickname ||
        !phone ||
        !about ||
        !address ||
        !city ||
        !region
      ) {
        throw new Error("Data tidak boleh kosong");
      }

      const updateData: any = {
      fullname,
      nickname,
      about,
      phone,
      address,
      city,
      region,
      birthdate,
    };

    if (avatar) {
      updateData.avatar = avatar;
    }

    const { data: userData, error: userError } = await supabase
      .from("users")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    console.log(userError?.message)
    if (userError) {
      throw new Error(userError.message);
    }

    return userData;
}
