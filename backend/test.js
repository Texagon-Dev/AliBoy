

const supabase = require("../backend/utilities/supabase");
const fs = require('fs');
require('dotenv').config();

async function uploadPDF(filePath) {
  try {
    if (!fs.existsSync(filePath)) {
      console.error('File not found:', filePath);
      return;
    }

    // Read the PDF file
    const fileData = fs.readFileSync(filePath);

    // Upload the file to Supabase Storage
    const { data, error } = await supabase.storage.from('storypdf').upload('public/file.pdf', fileData);

    if (error) {
      console.error('Error uploading file:', error.message);
      return;
    }

    console.log('File uploaded successfully:', data.Key);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Usage
const filePath = 'file.pdf'; // Assuming the file is in the same folder
uploadPDF(filePath);
