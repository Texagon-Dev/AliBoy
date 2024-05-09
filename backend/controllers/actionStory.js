const storyGeneration = require("../utilities/storyGeneration");
const storyPrompt = require("../utilities/prompts");


async function actionStory(req, res) {
  const inputString = req.body.input;
  console.log(inputString);

  const {
    story_explanation,
    language,
    total_chapters,
    story_length,
    character_explanations,
    image_style,
  } = inputString;

  let paragraphs = 2; // Initialize paragraphs as a number
  if (story_length === "Standard") {
    paragraphs = 2;
  } else if (story_length === "Medium") {
    paragraphs = 5;
  } else if (story_length === "Large") {
    paragraphs = 7;
  } else {
    paragraphs = 3;
  }

  const final_input = `
                        Story Explanation : ${story_explanation}
                        Character Explanations : ${character_explanations}
                        Preferred Language : ${language}
                        Total Chapters Needs to Generate : ${total_chapters}
                        Paragraphs in each Chapter : ${paragraphs}
                        Words In each Paragraph : 400

                        Instructions: Must follow the above constraints for paragraph and word limit strictly. Now Generate Chapter 1. If I like it then I will request for the rest of the chapters.
                        `;

  try {
    const prompt = await storyPrompt("actionStory");
    const final = await storyGeneration(prompt, final_input, total_chapters);

    res.json({ output: final.output });
  } catch (error) {
    // Handle errors
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}

module.exports = {
  actionStory,
};
