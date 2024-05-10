import supabase from "./supabase";

// 1- FOR UPLOADING PDFS AND IMAGES ON SUPABASE

export default async function uploadFileToSupabase(
  userId,
  pdfBlob,
  // imageBlob,
  genre,
  storyName = "Random Story"
) {
  // Helper function to upload a single file
  const uploadToStorage = async (folder, file) => {
    const safeFileName = `file_${new Date().getTime()}`;
    const path = `user_${userId}/${folder}/${safeFileName}`;

    const { data, error } = await supabase.storage
      .from("storypdf")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(`Error uploading file to ${folder}:`, error.message);
      return null;
    }
    return path;
  };

  // Upload PDF and Image separately
  const pdfPath = await uploadToStorage("pdf-documents", pdfBlob);
  // const imagePath = await uploadToStorage("images", imageBlob);

  if (!pdfPath) {
    console.error("Failed to upload files");
    return;
  }

  // Database entry update
  const dbData = {
    uuid: userId,
    story_name: storyName,
    tags: genre,
    pdf_path: pdfPath,
    // story_picture: imagePath,
  };

  const { data: userData, error: storyError } = await supabase
    .from("User_Story_Books")
    .insert([dbData], { upsert: true });

  if (storyError) {
    console.error(`Error updating User_Story_Books:`, storyError.message);
    return null;
  }

  console.log("Files uploaded successfully:", userData);
  console.log(`${pdfPath.toUpperCase()} Pdf uploaded successfully:`, dbData);
  return userData;
}

export const fetchUserStoryBooks = async (userId) => {
  try {
    const { data, error } = await supabase
      .from("User_Story_Books")
      .select("*") // You can customize this to select specific columns
      .eq("uuid", userId);

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching User Story Books:", error.message);
    return null;
  }
};
