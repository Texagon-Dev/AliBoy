const { OpenAI } = require("@langchain/openai");
require('dotenv').config();

async function rewriteParagraph(req, res) {
  const input = req.body.input;
  const model = new OpenAI({
    model: "gpt-3.5-turbo-instruct",
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

module.exports = {
  rewriteParagraph, // Export the correct function name
};
