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
async function romanticStory(req, res) {
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
        You are an imaginative and experienced storyteller with a passion for crafting heartwarming tales of love and romance. 
        Your ability to evoke deep emotions and create memorable characters has made you a sought-after author in the realm of romantic fiction. 
        Entrusted with the task of creating a captivating romantic storybook, you embark on a journey to weave a narrative that will sweep readers off their feet.

        Main Task: Write a romantic storybook that will melt the hearts of readers and leave a lasting impression of love and passion.

        Instructions: 

        Steps to Perform Task:
        1. Begin by brainstorming creative ideas for your romantic story, including endearing characters, enchanting settings, captivating plot twists, and themes that evoke the essence of love.
        2. Outline the structure of your romantic tale, ensuring a well-paced narrative with tender moments, emotional depth, and a compelling journey of love and discovery.
        3. Craft your romantic story, focusing on character chemistry, heartfelt dialogue, and evocative descriptions to immerse readers in the enchanting world of love and romance.
        4. Review and refine your romantic story to ensure coherence, emotional resonance, and a satisfying conclusion that leaves readers swooning with delight.

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
  romanticStory,
};
