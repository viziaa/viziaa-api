import { supabase } from "../client/supabase";

export interface CV {
  id?: string;
  created_by: string;
  color?: string;
  font?: string;
  name: string;
}

export const getCVsService = async (userId: string): Promise<CV[]> => {
  const { data: cvs, error: cvError } = await supabase
    .from("cv")
    .select("*")
    .eq("created_by", userId);

  if (cvError) throw cvError;
  if (!cvs) return [];

  // Ambil semua education untuk user tersebut
  const { data: educations, error: eduError } = await supabase
    .from("education")
    .select("*");

  if (eduError) throw eduError;

  // Gabungkan data education ke masing-masing CV
  return cvs.map((cv) => ({
    ...cv,
    educations: educations?.filter((edu) => edu.cv_id === cv.id) || [],
  }));
};

export const createCVService = async (cv: CV): Promise<CV> => {
  const { data, error } = await supabase
    .from("cv")
    .insert([cv])
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const updateCVService = async (
  id: string,
  cv: Partial<CV>
): Promise<CV> => {
  const { data, error } = await supabase
    .from("cv")
    .update(cv)
    .eq("id", id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

export const deleteCVService = async (id: string): Promise<void> => {
  const { error } = await supabase.from("cv").delete().eq("id", id);
  if (error) throw error;
};
