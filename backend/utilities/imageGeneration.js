const { DallEAPIWrapper } = require("@langchain/openai");
const {
  summarizeProtagonist,
  storySynopsis,
  promptArt,
} = require("../controllers/rewriteParagraph");

const {promptRewrite} = require("../utilities/generateDallePrompt");
require("dotenv").config();

async function imageGeneration(prompt) {
  url = "image url here";
  const tool = new DallEAPIWrapper({
    n: 1, // Default
    model: "dall-e-3", // Default
    apiKey: process.env.OPENAI_API_KEYS, // Default
  });

  const imageURL = await tool.invoke(prompt);
  console.log(imageURL);
  return url;
}

async function coverImageGeneration(genre, title,color) {

  // prompt = await promptRewrite(`create a abstract design on the theme of ${genre} with bold title written on it "${title}". keep the image design simple.`)
  // prompt = `
  // create a image with a minimalist design for a ${genre} genre, focusing on simplicity with clean lines and minimal elements. Use a bold and dynamic color palette with vibrant, well-contrasted colors. The background should match the horror genre, and the title text should be in clear, legible fonts. The image should face front and include only the title text.

  // Title: ${title}


  //   `;
  prompt = `
  Create a striking and visually engaging image for the genre ${genre} title '${title}' Use a minimalist design with bold and dynamic colors. Incorporate genre-specific elements. Ensure the typography is clear and prominent, with only the title text '${title}' in the image. use ${color} color theme.centered image composition.
  `;

  const tool = new DallEAPIWrapper({
    n: 1, // Default
    model: "dall-e-3", // Default
    apiKey: process.env.OPENAI_API_KEYS, // Default
  });

  const imageURL = await tool.invoke(prompt);
  console.log(imageURL);
  return imageURL;
}

async function artImageGeneration(genre, title, story,color) {
  summary = await summarizeProtagonist(title, story);


  prompt = `
      Create an illustration of the main character from the storybook titled '${title}' based on this summary:

      ${summary}
      
      Depict the character in a style suitable for the ${genre} genre, with a setting that complements the story. Capture the character's essence and the story's tone. use ${color} color theme.
      `;
    final = await promptArt(prompt);

  const tool = new DallEAPIWrapper({
    n: 1, // Default
    model: "dall-e-3", // Default
    apiKey: process.env.OPENAI_API_KEYS, // Default
  });

  const imageURL = await tool.invoke(final);
  console.log(imageURL);
  return imageURL;
}

async function backCoverImageGeneration(genre,color ) {
  // synopsis = await storySynopsis(title, story);
  
  prompt = `
       create a very simple and minimalistic ilustration in abstract shapes style in ${color} color and ${genre} genre theme.give this a look of back cover without adding any text in the image.
  
       
        `;

  const tool = new DallEAPIWrapper({
    n: 1, // Default
    model: "dall-e-3", // Default
    apiKey: process.env.OPENAI_API_KEYS, // Default
  });

  const imageURL = await tool.invoke(prompt);
  console.log(imageURL);
  return imageURL;
}

module.exports = {
  imageGeneration,
  coverImageGeneration,
  artImageGeneration,
  backCoverImageGeneration,
};


// async function main() {
//   console.log("Fetching data...");
//   const data = await backCoverImageGeneration("horror","pink");
//   // console.log(data); // Output: Data fetched
// }

// main();