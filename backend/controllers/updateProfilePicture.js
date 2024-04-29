const formidable = require('formidable');
const supabase = require('../utilities/supabase');

// Function to upload image to Supabase storage and update image path in User_Stories_Book table
async function uploadImageAndPath(req, res) {
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: 'An error occurred while parsing the form data' });
        }

        const { uuid } = fields;
        const { story_picture } = files;

        if (!story_picture) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        try {
            // Upload image to bucket "aliboy" in folder named as "user_${uuid}"
            const { data: uploadData, error: uploadError } = await supabase.storage
                .from('aliboy')
                .upload(`user_${uuid}/${story_picture.name}`, story_picture._writeStream); 

            if (uploadError) {
                throw uploadError;
            }

            const imagePath = uploadData.Location;

            // Update image path in User_Stories_Book table where uuid matches
            const { data: updateData, error: updateError } = await supabase
                .from('User_Story_Book')
                .update({ story_picture: imagePath })
                .eq('story_book_id', 1); // Assuming the column is named 'uuid' in the database

            if (updateError) {
                throw updateError;
            }

            res.status(200).json({ message: 'Image uploaded and path updated successfully' });
        } catch (error) {
            console.error('Error:', error.message);
            res.status(500).json({ error: error.message });
        }
    });
}

module.exports = {
    uploadImageAndPath
};
