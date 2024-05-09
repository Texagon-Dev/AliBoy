const { DallEAPIWrapper } = require("@langchain/openai");
require('dotenv').config();

async function imageGeneration(prompt) {
    const tool = new DallEAPIWrapper({
      n: 1, // Default
      model: "dall-e-3", // Default
      apiKey: process.env.OPENAI_API_KEYS, // Default
    });
    
    const imageURL = await tool.invoke(prompt);
    console.log(imageURL)
    return imageURL;
  }
  
module.exports = {
    imageGeneration,
  };