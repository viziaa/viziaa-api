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

export const getEducationsService = async (
  cvId: string
): Promise<Education[]> => {
  const { data, error } = await supabase
    .from("education")
    .select("*")
    .eq("cv_id", cvId)
    .order("date_in", { ascending: false });

  if (error) throw error;
  return data || [];
};

export const createEducationService = async (
  education: Education
): Promise<Education> => {
  const { data, error } = await supabase
    .from("education")
    .insert([education])
    .select()
    .single();

  if (error) throw error;
  return data;
};
