const storyGeneration = require("../utilities/storyGeneration");
const storyPrompt = require("../utilities/prompts");


async function romanticStory(req, res) {
  let inputString;

  try {
    inputString = req.body.input;
    if (!inputString) {
      throw new Error("Please provide a valid input from front end");
    }

    var {
      story_explanation,
      language,
      total_chapters,
      story_length,
      character_explanations,
    } = inputString;
    
    console.log(inputString);
  } catch (error) {
    console.error("Error parsing input:", error.message);
    return res.status(400).json({ error: error.message });
  }

  // Validate required fields and collect missing fields
  const missingFields = [];
  if (!story_explanation) missingFields.push("story_explanation");
  if (!total_chapters) missingFields.push("total_chapters");
  if (!story_length) missingFields.push("story_length");
  if (!character_explanations) missingFields.push("character_explanations");

  if (missingFields.length > 0) {
    console.log(`Missing required fields : ${missingFields}`)
    return res.status(400).json({ error: "Missing required fields", missingFields });
  }

  let paragraphs = 0; // Initialize paragraphs as a number
  let words = 100;

  if (story_length === "Standard") {
    paragraphs = 5;
  } else if (story_length=== "Medium") {
    paragraphs = 8;
  } else if (story_length === "Large") {
    paragraphs = 10;
  } else {
    paragraphs = 5;
  }

  console.log("Paragraphs : ",paragraphs)

  const final_input = `
                        Story Explanation : ${story_explanation}
                        Character Explanations : ${character_explanations}
                        Preferred Language : ${language}
                        Total Chapters Needs to Generate : ${total_chapters}
                        
            
                        Instructions: Must follow the above instructions. Now Generate Chapter 1 with ${paragraphs} paragraphs each paragraph containing ${words} words. If I like it then I will request for the rest of the chapters.
                        `;

  try {
    const prompt = await storyPrompt("romanticStory",story_length);
    genre = "romantic";
    const final = await storyGeneration(prompt, final_input, total_chapters , paragraphs , words , genre);
    res.json( final );
  } catch (error) {
    // Handle errors
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}

module.exports = {
  romanticStory,
};
