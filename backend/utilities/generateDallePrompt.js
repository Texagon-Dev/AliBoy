const { ChatOpenAI } = require("@langchain/openai");
require("dotenv").config();

async function generateDallePrompt(prompt) {
  const model = new ChatOpenAI({
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEYS,
    model: "gpt-4-turbo",
  });
  const res = await model.invoke(
    `
      Role:
      You are an expert prompt engineer for DALL-E, assisting a seasoned storybook writer in generating images that replicate the content of storybook.
  
      Task:
        - Generate a detailed prompt to create an image that accurately represents the storyline of the given storybook.
  
      StoryBook in json format: ${prompt}
          
      Steps to do the Task:
          1. Read through each chapter thoroughly, noting key events and character interactions.
          2. Highlight pivotal moments or scenes that drive the plot forward or reveal significant character development.
          3. Craft descriptive prompts for each main scene, detailing the setting, characters, actions, and emotions.
          4. Review prompts to ensure flow between chapters and consistency in tone.
          
          

      Instructions: 
          1. Keep the prompts as descriptive as possible. Add details like character detail, background details, emotions, action, and interaction between all that.
          2. there should be no instruction to add any text in the image.
          3. Must add the image style in the promt.
          4. Elaborate the scene to draw well in the prompt.
          5. Start the prompt with the word 'Imagine'
  
      Image Style: 
        - Maintain a Pixar-style  for the image.
  
        JSON Prompt Structure:
        \`\`\`json
        {
          "Chapter {number}": {dalle prompt},//prompt of each chapter
        }
 
        
        \`\`\`

        ## Output:
        - WHen responding to me must follow the above JSON Prompt Structure strictly.
        - findout het total number of chapters privded in the story book.
        - Your final output should consist of prompts for each chapter in JSON format, structured to guide DALL-E in generating images that accurately represent the storyline and emotional journey of the storybook. Ensure that the prompts maintain the flow of the narrative and capture the essence of each chapter.
  
      `
  );
  console.log(res.content);
  return res.content; // Trim any leading/trailing whitespace
  // return "dalle prompt"
}

async function promptRewrite(instructions) {
  const model = new ChatOpenAI({
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEYS,
    model: "gpt-4-turbo",
  });
  const res = await model.invoke(`
    
  Generate a descriptive prompt for Dalle-3.
  In your description use 

  details:
  Minimalist Design: Focus on simplicity with clean lines and minimal elements. Avoid clutter and ensure that the primary elements stand out clearly.
  Bold and Dynamic Colors: Use a bold color palette that reflects the mood and genre . Ensure the colors are dynamic and contrast well to make the image visually appealing.
  Background : Background should match the genre.
  Typography: Use clear, legible fonts for the title . The typography should complement the overall design and enhance readability.
  Genre-Specific Elements: Integrate elements that are specific to the genre. For example, use soft, pastel colors and whimsical illustrations, or dark, moody tones and intricate patterns.
  Overall Composition: Ensure a balanced composition with a focal point that draws the viewer's attention. The design should be cohesive and aesthetically pleasing from a distance as well as up close.
  ${instructions}

    `);

  console.log(res.content);
  return res.content;
}


module.exports = {
  generateDallePrompt,
  promptRewrite,

};
