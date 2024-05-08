import supabase from "./supabase";

async function uploadPdfToSupabase(userId, file) {
  const path = `user_${userId}/storybook.pdf`; 
  const { data, error } = await supabase.storage
    .from("storypdf")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Error uploading PDF:", error.message);
    return null;
  }

  console.log("PDF uploaded successfully:", data);
  return data;
}

export default uploadPdfToSupabase