
const { ChatOpenAI } = require("@langchain/openai");


async function generateDallePrompt(prompt) {

    const model = new ChatOpenAI({ temperature: 0 , apiKey: process.env.OPENAI_API_KEY  , model: "gpt-3.5-turbo" });
    const res = await model.invoke(
      `
      Role:
      You are an expert prompt engineer for DALL-E, assisting a seasoned storybook writer in generating images that replicate the content of each chapter.
  
      Task:
        - Generate a detailed prompt to create an image that accurately represents the storyline of the given storybook chapter.
  
      Chapter Content: ${prompt}
          
      Steps to do the Task:
          1. Begin by identifying the number of characters present in the chapter.
          2. Provide a concise summary of the chapter, emphasizing its key events and themes.
          3. Analyze the summary to understand the narrative flow and emotional context.
          4. Start the prompt with the word 'Imagine' to stimulate the AI's creativity.
  
      Image Style: 
        - Maintain a Disney-style aesthetic for the image.
  
      Output:
          - Your final prompt should guide the AI in generating an image that captures the essence of the storybook chapter, including detailed descriptions of characters, settings, and emotional nuances. 
          - Encourage creativity while ensuring consistency with the overall tone and style of the storybook.
  
      `
    );
    // console.log(res.content);
    return res.content; // Trim any leading/trailing whitespace
  }

module.exports = {
    generateDallePrompt,
  };
  