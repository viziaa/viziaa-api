import { supabase } from "../client/supabase";
import { registerScema } from "../validations/login-register";


export async function registerUser(fullname: string ,email:string, password:string) {
    try{
        if(password.length <6) throw new Error("Password harus mengandung minimal 6 Karakter")
        
        const {error: schemaError} = registerScema.validate({ fullname, email,password})
        if(schemaError) throw new Error(schemaError.message)

        
        // Signup
        const { data:authData, error:authError } = await supabase.auth.signUp({
            email,
            password,
        });
    
        if (authError) throw new Error(authError.message);
        
        const user_id = authData.user?.id
        if(!user_id) throw new Error ("gagal ambil id user dari Auth database")
        
        const {data:dbData, error:dbError} = await supabase
        .from("users")
        .insert({id:user_id, fullname, email})
        .select()
        .single()
        if (dbError) throw new Error(dbError.message)

       return{id: authData.user?.id, fullname: dbData.fullname, email: authData.user?.email}
    } catch (err:any) {throw new Error(err.message || "Terjadi kesalahan");}
}

export async function loginUser(email: string, password:string) {
    try{
        const {data:authData, error:authError} = await supabase.auth.signInWithPassword({
            email,
            password
        })
        if(authError) throw new Error (authError.message)
        
        const {data:dbData, error:dbError} = await supabase
        .from("users")
        .select("id, nickname, fullname, email")
        .eq("email", email)
        .single()

        if(!dbData) throw new Error("data user tidak ditemukan")
        return{dbData, access_token: authData.session.access_token, refresh_token:authData.session.refresh_token}
    } catch (err:any) {throw new Error(err.message || "Terjadi kesalahan");}
    
}

export async function logoutService(token: any) {
  if (!token) {
    return {
      code: 400,
      status: "error",
      message: "No session found",
    };
  }

  const { error } = await supabase.auth.signOut(token);

  if (error) {
    return {
      code: 400,
      status: "error",
      message: error.message,
    };
  }

  return {
    code: 200,
    status: "success",
    message: "Logout successful",
  };
}

