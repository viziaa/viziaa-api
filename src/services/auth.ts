import { supabase } from "../client/supabase";

export async function register(
  fullname: string,
  email: string,
  password: string
) {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError) throw new Error(authError.message);

  const user_id = authData.user?.id;

  const { data: dbData, error: dbError } = await supabase
    .from("users")
    .insert({ id: user_id, fullname, email })
    .select("id, fullname, email")
    .single();
  if (dbError) throw new Error(dbError.message);

  return dbData;
}

export async function login(email: string, password: string) {
  const { data: authData, error: authError } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  if (authError) throw new Error(authError.message);

  const { data: dbData, error: dbError } = await supabase
    .from("users")
    .select("id, fullname, email")
    .eq("id", authData.user?.id)
    .single();

  if (dbError) throw new Error(dbError.message);
  return {
    dbData,
    access_token: authData.session.access_token,
  };
}

export async function logout(token: any) {
  if (!token) throw new Error("Tidak ada token");

  const { error } = await supabase.auth.signOut(token);

  if (error) throw new Error(error.message);

  return;
}
