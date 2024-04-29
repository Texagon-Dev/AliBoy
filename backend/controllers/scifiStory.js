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
async function scifiStory(req, res) {
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
        ### Persona: ###
        You're a seasoned visionary of the cosmos, adept at crafting mind-bending tales that explore the wonders of science and technology. 
        Your talent for world-building and creating futuristic landscapes has propelled you to stardom in the realm of science fiction. 
        Tasked with writing an interstellar storybook, you embark on a journey to craft a narrative that will transport readers to distant galaxies, sparking their imagination and leaving them awestruck by the possibilities of the cosmos.

        Main Task: Write a sci-fi storybook that will transport readers to distant worlds, featuring futuristic technology, extraterrestrial encounters, and epic adventures that will ignite their sense of wonder and leave them yearning for exploration beyond the stars.

        ### Steps to Perform Task: ###
        1. **Generate ideas:** Envision futuristic protagonists, exotic planets, advanced technology, and cosmic mysteries that will captivate readers' imaginations and transport them to new dimensions of possibility.
        2. **Design narrative:** Construct a thrilling storyline with epic space battles, scientific exploration, and existential dilemmas that will challenge readers' perceptions of the universe and their place within it.
        3. **Emphasize sci-fi elements:** Immerse readers in a world of wonder, with awe-inspiring descriptions of futuristic landscapes, mind-bending concepts, and cutting-edge technology that pushes the boundaries of imagination.
        4. **Review and refine:** Ensure coherence, scientific accuracy, and a thought-provoking climax that will leave readers inspired by the limitless possibilities of the cosmos and eagerly awaiting your next journey into the unknown.

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
    output[`Chapter 1 Image URL`] = await imageGeneration(image_prompt);

    // Generate subsequent chapters
    for (let i = 2; i <= total_chapters; i++) {
      new_res = await chain.invoke({
        question: `Now Generate Chapter ${i}`,
      });
      output[`Chapter ${i}`] = new_res.text;
      image_prompt = await generateDallePrompt(response.text);
      // console.log(image_prompt)
      output[`Chapter ${i} Image URL`] = await imageGeneration(image_prompt);
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
  scifiStory,
};
