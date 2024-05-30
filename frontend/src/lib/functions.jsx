import { setUserAvatar } from "@/redux/features/userSlice";
import supabase from "./supabase";

// 1- FOR UPLOADING PDFS AND IMAGES TO SUPABASE AND INSERTING DATA TO SUPABASE

export default async function uploadFileToSupabase(
  userId,
  pdfBlob,
  imageBlob,
  genre,
  storyName,
  metadata,
  totalSlides
) {
  // Helper function to upload a single file
  const uploadToStorage = async (folder, file) => {
    const safeFileName = `file_${new Date().getTime()}`;
    const path = `user_${userId}/${folder}/${safeFileName}`;

    const { data, error } = await supabase.storage
      .from("stories")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.error(`Error uploading file to ${folder}:`, error.message);
      return { path: null, publicUrl: null };
    }

    // Fetch the public URL for the uploaded file
    const response = await supabase.storage.from("stories").getPublicUrl(path);
    if (response.error) {
      console.error(
        `Error getting public URL for ${folder} file:`,
        response.error.message
      );
      return { path: null, publicUrl: null };
    }

    const publicUrl = response.data.publicUrl;
    console.log("Public URL:", publicUrl);

    return { path, publicUrl };
  };

  // Upload PDF and Image separately
  const { path: pdfPath, publicUrl: pdfPublicUrl } = await uploadToStorage(
    "pdf-documents",
    pdfBlob
  );
  const { path: imagePath, publicUrl: imagePublicUrl } = await uploadToStorage(
    "images",
    imageBlob
  );

  if (!pdfPath || !imagePath) {
    console.error("Failed to upload files");
    return;
  }

  // Database entry update
  const dbData = {
    uuid: userId,
    story_name: storyName,
    tags: genre,
    pdf_path: pdfPublicUrl,
    story_picture: imagePublicUrl, // Use the public URL of the image as story picture
    metadata: metadata,
    total_slides: totalSlides,
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

// 2- FETCHING STORY BOOK CARD FROM SUPABASE
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

export const fetchStoryBooks = async () => {
  try {
    const { data, error } = await supabase.from("User_Story_Books").select("*"); // You can customize this to select specific columns

    if (error) {
      throw error;
    }

    return data;
  } catch (error) {
    console.error("Error fetching User Story Books:", error.message);
    return null;
  }
};

export const deleteUserStoryBook = async (storybookId) => {
  try {
    const { error } = await supabase
      .from("User_Story_Books")
      .update({ is_deleted: true })
      .eq("story_book_id", storybookId);

    if (error) {
      throw error;
    }

    console.log("User story book soft deleted successfully");
  } catch (error) {
    console.error("Error soft deleting User Story Book:", error.message);
  }
};

// 3- FOR UPLOADING AVATAR AND UPDATING USER TABLE
export async function uploadAvatarToSupabase(userId, file, dispatch) {
  const folder = "avatars";
  const fileName = `avatar_${new Date().getTime()}`;
  const path = `user_${userId}/${folder}/${fileName}`;

  // Upload file to storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("stories")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (uploadError) {
    console.error("Error uploading image:", uploadError.message);
    return null;
  }

  // Fetch the public URL for the uploaded file
  const response = await supabase.storage.from("stories").getPublicUrl(path);
  if (response.error) {
    console.error("Error getting public URL:", response.error.message);
    return null;
  }

  const publicURL = response.data.publicUrl;
  console.log("Public URL:", publicURL);

  // Update user profile in the database
  const { error: updateError } = await supabase
    .from("users")
    .update({ profile_image: publicURL })
    .eq("uuid", userId);

  if (updateError) {
    console.error("Error updating user profile:", updateError.message);
    return null;
  }

  dispatch(setUserAvatar(publicURL));

  console.log("Image uploaded and profile updated successfully:", uploadData);
  return uploadData;
}

// 4- FOR USERS FROM SUPABASE
export const fetchUser = async (userId) => {
  if (!userId) {
    return null;
  }

  console.log("Fetching users for userId:", userId);

  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("uuid", userId);

    if (error) {
      console.error("Supabase error:", error.message);
      throw error;
    }

    console.log("Fetched users data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching User Story Books:", error.message);
    return null;
  }
};

// 4- FOR USERS FROM SUPABASE
export const fetchUsers = async () => {
  try {
    const { data, error } = await supabase.from("users").select("*");

    if (error) {
      console.error("Supabase error:", error.message);
      throw error;
    }

    console.log("Fetched users data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching User Story Books:", error.message);
    return null;
  }
};

export const updateUserPassword = async (userId, newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      id: userId,
      password: newPassword,
    });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error };
  }
};

export const updateUserProfile = async (userId, data) => {
  try {
    const { data: userData, error } = await supabase
      .from("users")
      .update({
        email: data.email,
        metadata: {
          ...data.metadata,
          full_name: data.name,
          dob: data.dob,
        },
      })
      .eq("uuid", userId);

    if (error) throw error;
    return { success: true, data: userData };
  } catch (error) {
    console.error("Error updating user profile:", error.message);
    return { success: false, error: error.message };
  }
};

export async function upsertBookPrintingOrder(userId, orderData) {
  console.log("userId", userId, "orderData", orderData);
  try {
    const {
      story_book_id,
      binding_name,
      title_size,
      quantity,
      country,
      city_region,
      delivery_address,
      postal_code,
      item_total,
      discount,
      shipping_amount,
      payment_method,
      order_status,
    } = orderData;

    const { data, error } = await supabase
      .from("Book_Printing_Orders")
      .upsert([
        {
          story_book_id: parseInt(story_book_id),
          uuid: userId, // Corrected here to use userId passed to function
          binding_name: binding_name,
          title_size: title_size,
          quantity: quantity,
          country: country,
          city_region: city_region,
          delivery_address: delivery_address,
          postal_code: postal_code,
          item_total: item_total,
          discount: discount,
          shipping_amount: shipping_amount,
          payment_method: payment_method,
          order_status: order_status,
        },
      ])
      .eq("uuid", userId);

    if (error) {
      // Handle error
      console.error("Error upserting data:", error.message);
    } else {
      // Handle success
      console.log("Data upserted successfully:", data);
    }
  } catch (error) {
    // Handle any unexpected errors
    console.error("Unexpected error:", error.message);
  }
}

export async function fetchAllBookPrintingOrders() {
  try {
    const { data, error } = await supabase
      .from("Book_Printing_Orders")
      .select("*");

    if (error) {
      console.error("Error fetching data:", error.message);
      return null;
    } else {
      console.log("Data fetched successfully:", data);
      return data;
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
    return null;
  }
}

export async function updateBookPrintingOrderStatus(orderId, updatedData) {
  console.log("orderId", orderId, "updatedData", updatedData);
  try {
    const { order_status } = updatedData;

    const { data, error } = await supabase
      .from("Book_Printing_Orders")
      .update({ order_status })
      .eq("printing_id", orderId); // Assuming 'printing_id' is the primary key

    if (error) {
      console.error("Error updating data:", error.message);
    } else {
      console.log("Data updated successfully:", data);
    }
  } catch (error) {
    console.error("Unexpected error:", error.message);
  }
}
