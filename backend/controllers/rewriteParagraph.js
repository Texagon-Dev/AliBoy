const { OpenAI } = require("@langchain/openai");
require('dotenv').config();

async function rewriteParagraph(req, res) {
  const input = req.body.input;
  const model = new OpenAI({
    model: "gpt-4o",
    temperature: 0.5,
    apiKey: process.env.OPENAI_API_KEYS,
  });

  try {
    const final_input = `
    Your task is to rewrite the following text given below without losing the context and flow.

    ${input}
    `;
    const output = await model.invoke(final_input); // Await the result of model.invoke()

    res.json({ output: output }); // Send the output as JSON response
  } catch (error) {
    // Handle errors
    console.error("An error occurred:", error);
    res.status(500).json({ error: "An error occurred while processing the request" });
  }
}

async function summarizeProtagonist(title, story) {
  const model = new OpenAI({
    model: "gpt-4o",
    temperature: 0.5,
    apiKey: process.env.OPENAI_API_KEYS,
  });

  try {
    const final_input = `
    Here is the complete text of the storybook '${title}'. Please read through the story and provide a two-line summary about the main character or protagonist. Focus on their key traits, appearance, and any distinctive qualities or roles they play in the story:
    "
    ${story}
    "
    `;

    const output = await model.invoke(final_input); // Await the result of model.invoke()

    return output; // Return the output
  } catch (error) {
    // Handle errors
    console.error("An error occurred:", error);
    throw new Error("An error occurred while processing the request"); // Throw an error instead of sending a response
  }
}

async function storySynopsis(title, story) {
  const model = new OpenAI({
    model: "gpt-4o",
    temperature: 0.5,
    apiKey: process.env.OPENAI_API_KEYS,
  });

  try {
    const final_input = `
    Here is the complete text of the storybook titled '${title}'.
     Please read through the story and provide a concise synopsis or blurb that captures the main plot points, key characters, and overall theme of the story. 
     The synopsis should be engaging and provide a clear overview of the story:

    
    "
    ${story}
    "
    `;

    const output = await model.invoke(final_input); // Await the result of model.invoke()

    return output; // Return the output
  } catch (error) {
    // Handle errors
    console.error("An error occurred:", error);
    throw new Error("An error occurred while processing the request"); // Throw an error instead of sending a response
  }
}

async function promptArt(instructions) {
  const model = new OpenAI({
    model: "gpt-4o",
    temperature: 0.5,
    apiKey: process.env.OPENAI_API_KEYS,
  });

  try {
    const final_input = `
    I want to generate a character illustration artwork my storybook main character. I have written a rough prompt but your job is to optimize the prompt for specific to Dall-E-3.
    add instructions to give only one character and no text in the art work.
  ${instructions}
    `;

    const output = await model.invoke(final_input); // Await the result of model.invoke()

    return output; // Return the output
  } catch (error) {
    // Handle errors
    console.error("An error occurred:", error);
    throw new Error("An error occurred while processing the request"); // Throw an error instead of sending a response
  }
}

module.exports = {
  rewriteParagraph,summarizeProtagonist,storySynopsis,promptArt // Export the correct function name
};
