const supabase = require('../utilities/supabase');
const User = require('../models/bookPrintingOrder');

async function storyBooks(req, res) {
  const { uuid , story_name , pdf_path , tags , story_picture  } = req.body;

  try {
    

    const { data: user, error } = await supabase
      .from('User_Story_Books')
      .insert([{ uuid: uuid, story_name: story_name , pdf_path: pdf_path , tags: tags , story_picture: story_picture }]);

    if (error) throw error;

    res.status(201).json({ message: 'Book Printing Order Successfully ' });
  } catch (error) {
    console.error('Error Printing Error:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = { storyBooks };