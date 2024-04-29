const { LLMChain } = require("langchain/chains");
const { DallEAPIWrapper } = require("@langchain/openai");
const { OpenAI } = require("@langchain/openai");
const { ChatOpenAI } = require("@langchain/openai");
const { PromptTemplate } = require("@langchain/core/prompts");

const { generateDallePrompt } = require("../utilities/generateDallePrompt");
const { imageGeneration } = require("../utilities/imageGeneration");

const {
  ChatPromptTemplate,
  MessagesPlaceholder,
} = require("@langchain/core/prompts");
const { BufferMemory } = require("langchain/memory");

// Configure the ChatOpenAI instance
const llm = new ChatOpenAI({
  temperature: 0,
  apiKey: process.env.OPENAI_API_KEY,
  model: "gpt-4-0125-preview",
});

// Controller function to handle the conversation
async function mysteryStory(req, res) {
  let memory = new BufferMemory({
    returnMessages: true,
    memoryKey: "chat_history",
  });
  const inputString = req.body.input;
  console.log(inputString);
  // const requestData = JSON.parse(inputString);
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
  }

  const final_input = `
                      Story Explanation : ${story_explanation}
                      Character Explanations : ${character_explanations}
                      Preferred Language : ${language}
                      Total Chapters : ${total_chapters}
                      Paragraphs in each Chapter : ${paragraphs}
                      Words In each Paragraph : 400

                      Instructions: Must follow the above constraints for paragraph and word limit strictly. Now Generate Chapter 1. If I like it then I will request for the rest of the chapters.
                      `;

  try {
    // Create the conversation chain
    const chatPrompt = ChatPromptTemplate.fromMessages([
      [
        "system",
        `
        Persona:
        You're a seasoned sleuth of the written word, skilled at crafting captivating mysteries that keep readers guessing until the final page. 
        Your talent for weaving intricate plots and creating enigmatic characters has established you as a luminary in the realm of mystery fiction. 
        Tasked with penning a gripping storybook, you set out to concoct a narrative that will challenge readers' deductive skills and keep them on the edge of their seats until the truth is unveiled.

        Main Task: Write a mystery novel that will intrigue readers, featuring perplexing puzzles, cryptic clues, and unexpected revelations that will keep them guessing and eager to unravel the secrets hidden within the pages.

        Steps to Perform Task:
        1. **Generate ideas:** Inventive protagonists, cryptic settings, perplexing puzzles, and layered plotlines that will pique readers' curiosity and engage their analytical minds.
        2. **Design narrative:** Develop a compelling storyline with intricate twists, red herrings, and clever misdirections that will keep readers guessing and searching for answers until the very end.
        3. **Emphasize mystery elements:** Immerse readers in a world of intrigue, with cryptic clues, suspenseful encounters, and a web of secrets waiting to be unraveled, keeping them engrossed in the mystery until the final reveal.
        4. **Review and refine:** Ensure coherence, clever plotting, and a satisfying resolution that ties up loose ends and leaves readers satisfied with the resolution of the mystery, while still leaving them eager for your next enigmatic tale.

        ### Instructions: ###
        - Follow the instructions provided by the human, incorporating story explanations, character explanations, and other details as specified.
        - Specificlly follow the  number of chapters in the story and maintain consistency with the language and tone throughout.
        - Ensure that the length of the story is appropriate for a storybook format, with enough depth and development to engage readers without overwhelming them.
        - Strictly follow the conditions provided by human.



        ### Output: ### 
        - Your final Output Should be a storybook chapter without loosing coherence.
        
        
        `,
      ],
      new MessagesPlaceholder("chat_history"),
      ["human", "{question}"],
    ]);

    const chain = new LLMChain({
      llm: llm,
      prompt: chatPrompt,
      verbose: false,
      memory: memory,
    });

    let output = {};
    // Call the conversation chain for Chapter 1
    response = await chain.invoke({
      question: final_input,
    });
    output[`Chapter 1`] = response.text;
    console.log(response);
    image_prompt = await generateDallePrompt(response.text);
    // console.log(image_prompt)
    output[`Chapter 1 Image URL`] = await chapterImage(image_prompt);

    // Generate subsequent chapters
    for (let i = 2; i <= total_chapters; i++) {
      new_res = await chain.invoke({
        question: `Now Generate Chapter ${i}`,
      });
      output[`Chapter ${i}`] = new_res;
    }

    // Return the response
    res.json({ output });
  } catch (error) {
    // Handle errors
    console.error("An error occurred:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing the request" });
  }
}

module.exports = {
  mysteryStory,
};
