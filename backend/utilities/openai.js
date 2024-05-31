const { ChatOpenAI } = require("@langchain/openai"); // Import the library you're using
require('dotenv').config(); // Load environment variables

console.log(process.env.OPENAI_API_KEYS)

function OpenAI() {
  const llm = new ChatOpenAI({
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEYS,
    model: "gpt-4o",
  });
  return llm
}


module.exports = OpenAI;


// import { OpenAI } from "@langchain/openai";
// const { OpenAI } = require("@langchain/openai");
// const final ="";
// const model = new OpenAI({
//   model: "gpt-3.5-turbo-instruct", // Defaults to "gpt-3.5-turbo-instruct" if no model provided.
//   temperature: 0.9,
//   apiKey: process.env.OPENAI_API_KEYS, // In Node.js defaults to process.env.OPENAI_API_KEY
// });
// model.invoke(
//   "What would be a good company name for a company that makes colorful socks?"
// ).then(res => {
//   final = res;
// });

// console.log(final)