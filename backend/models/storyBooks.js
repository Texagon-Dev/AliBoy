class StoryBooks {
    constructor(user_id , story_name , pdf_path , tags , story_picture  ) {
      this.user_id = user_id;
      this.story_name = story_name;
      this.pdf_path = pdf_path;
      this.tags = tags;
      this.story_picture = story_picture;
    }
  }
  
  module.exports = StoryBooks;