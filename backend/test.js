const { LLMChain } = require("langchain/chains");
const { OpenAI } = require("@langchain/openai");
const { BufferMemory } = require("langchain/memory");
const { ChatPromptTemplate, MessagesPlaceholder } = require("@langchain/core/prompts");
const { SystemMessage, HumanMessage } = require("@langchain/core/messages");
const { StructuredOutputParser, OutputParserException } = require("langchain/output_parsers");
const { z } = require("zod");
const storyPrompt = require("../backend/utilities/prompts");

// Initialize memory
let memory = new BufferMemory({
  returnMessages: true,
  memoryKey: "chat_history",
});

// Initialize OpenAI model
const llm = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
});

// Function to get the story prompt
async function getStoryPrompt() {
  return await storyPrompt("scifiStory", "Medium");
}

// Function to create the chat prompt template
async function createChatPrompt() {
  const prompt = await getStoryPrompt();

  // Static format instructions
  const formatInstructions = `Provide the following chapter details in JSON format. Ensure the output is in a proper JSON format:
  \`\`\`json
  {
    "Chapter Number": "Chapter number here",
    "Chapter Name": "Chapter name here",
    "Story": "Story content here"
  }
  \`\`\`
  Do not include any other text or explanations. Only provide the JSON response.`;

  // Debug the content to ensure it's correct
  console.log("Story Prompt:", prompt);
  console.log("Format Instructions:", formatInstructions);

  // Define the chat prompt template correctly
  return ChatPromptTemplate.fromMessages([
    new SystemMessage({ content: prompt }), // Correct instantiation
    new SystemMessage({ content: formatInstructions }), // Correct instantiation
    new MessagesPlaceholder("chat_history"),
    new HumanMessage({ content: "{question}" }) // Correct instantiation
  ]);
}

// Define the structured output parser using Zod schema
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    "Chapter Number": z.string().describe("The number of the chapter."),
    "Chapter Name": z.string().describe("The name of the chapter."),
    "Story": z.string().describe("The story content of the chapter.")
  })
);

// Function to get the response
async function getResponse(final_input) {
  try {
    const chatPrompt = await createChatPrompt();
    const chain = new LLMChain({
      llm: llm,
      prompt: chatPrompt,
      verbose: false,
      memory: memory,
      outputParser: parser, // Use the structured output parser
    });

    const response = await chain.call({ question: final_input });
    console.log(response);
  } catch (error) {
    if (error instanceof OutputParserException) {
      console.error('OutputParserException:', error);
      console.error('LLM Output:', error.llmOutput);
    } else {
      console.error('Failed to get structured response:', error);
    }
  }
}

// Example usage
const final_input = "give me a storybook on scifi. just give me only one chapter.";
getResponse(final_input);
