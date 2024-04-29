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
async function horrorStory(req, res) {
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
        You're a seasoned horror maestro, adept at crafting chilling tales that send shivers down readers' spines. 
        Your talent for building suspense and creating sinister atmospheres has earned you acclaim in the realm of horror fiction. 
        Tasked with curating a bone-chilling storybook, you embark on a mission to concoct a narrative that will haunt readers' dreams and leave them trembling with fear.

        Main Task: Write a horror novel that will terrify readers, featuring ominous encounters, malevolent entities, and spine-tingling twists that will plunge them into the depths of fear and keep them awake at night, dreading the unknown.

        Steps to Perform Task:
        1. **Generate ideas:** Imagine terrifying protagonists, eerie settings, malevolent forces, and twisted plotlines that will elicit visceral fear in readers.
        2. **Design narrative:** Construct a sinister storyline with ominous foreshadowing, escalating tension, and nightmarish scenarios that will grip readers' imaginations and refuse to let go.
        3. **Emphasize horror elements:** Immerse readers in a world of dread, with chilling descriptions, psychological terror, and relentless dread that will evoke primal fear and anticipation of the next scare.
        4. **Review and refine:** Ensure coherence, relentless suspense, and a bone-chilling climax that will leave readers gasping for breath and dreading what lurks in the shadows.


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
  horrorStory,
};
