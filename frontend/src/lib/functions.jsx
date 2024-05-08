import supabase from "./supabase";
// 1- FOR UPLOADING PDFS AND IMAGES ON SUPABASE
async function uploadFileToSupabase(userId, file, fileType, fileName = null) {
  // Determine the folder based on file type
  const folder =
    fileType === "pdf"
      ? "pdf-documents"
      : fileType === "image"
      ? "images"
      : "profiles";

  // Use provided fileName or default to a timestamp-based name if not provided
  const safeFileName = fileName || `file_${new Date().getTime()}`;

  const path = `user_${userId}/${folder}/${safeFileName}`;

  const { data, error } = await supabase.storage
    .from("storypdf")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error(`Error uploading ${fileType}:`, error.message);
    return null;
  }

 const { user, storyError } = await supabase
   .from("User_Story_Books")
   .insert([
     {
       uuid: userId,
       story_name: "",
       pdf_path: path,
       tags: "",
       story_picture: "",
     },
   ]);

 if (error) throw error;
    if (error) {
      console.error(`Error uploading:`, storyError.message);
      return null;
    }
  

  console.log(`${fileType.toUpperCase()} uploaded successfully:`, data);
  return data;

  
}

export default uploadFileToSupabase;





// export async function uploadAvatarToSupabase(userId, file) {
//   // Assuming fileType is always "image" for avatar uploads
//   const folder = "avatars";
//   const fileName = `avatar_${new Date().getTime()}`;

//   const path = `user_${userId}/${folder}/${fileName}`;

//   // Upload file to storage
//   const { data, error: uploadError } = await supabase.storage
//     .from("storypdf")
//     .upload(path, file, {
//       cacheControl: "3600",
//       upsert: false,
//     });

//   if (uploadError) {
//     console.error("Error uploading image:", uploadError.message);
//     return null;
//   }

//   // Get public URL for the uploaded file
//   const { publicURL, error: urlError } = supabase.storage
//     .from("storypdf")
//     .getPublicUrl(path);

//   if (urlError) {
//     console.error("Error getting public URL:", urlError.message);
//     return null;
//   }

//   // Update user profile in the database
//   const { error: updateError } = await supabase
//     .from("users")
//     .update({
//       profile_image: publicURL,
//     })
//     .eq("uuid", userId);

//   if (updateError) {
//     console.error("Error updating user profile:", updateError.message);
//     return null;
//   }

//   console.log("Image uploaded and profile updated successfully:", data);
//   return data;
// }
