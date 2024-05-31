const { LLMChain } = require("langchain/chains");
const OpenAI = require("../utilities/openai");
const { generateDallePrompt } = require("../utilities/generateDallePrompt");
const { imageGeneration,coverImageGeneration,artImageGeneration,backCoverImageGeneration} = require("../utilities/imageGeneration");
const { BufferMemory } = require("langchain/memory");
const {ChatPromptTemplate,MessagesPlaceholder,} = require("@langchain/core/prompts");
// const { StructuredOutputParser } = require("langchain/output_parsers");
// const { RunnableSequence } = require("@langchain/core/runnables");


 
// const parser = StructuredOutputParser.fromNamesAndDescriptions({
//   Chapter_Number: "number of story book chapter",
//   Chapter_Name: "name of the story book chapter",
//   Story: "story of the story book"
// });

require('dotenv').config();

const formatInstructions = `Provide the following chapter details in JSON format. Ensure the output is in a proper JSON format:
  \`\`\`json
  {{
    "Chapter Number": "Chapter number here",
    "Chapter Name": "Chapter name here",
    "Story": "Story content here"
  }}
  \`\`\`
  Do not include any other text or explanations. Only provide the JSON response.`;

async function storyGeneration(prompt,final_input,total_chapters , paragraphs , words , genre){

    let memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "chat_history",
    });

    const llm = OpenAI();

    const chatPrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `${prompt} + ${formatInstructions}`
        ,
    ],
    new MessagesPlaceholder("chat_history"),
    ["human", "{question}"],
    ]);

    const chain = new LLMChain({
    llm:llm,
    prompt: chatPrompt,
    verbose: false,
    memory: memory,
    });

    

    let output = {};
    response = await chain.invoke({question: final_input});
    chap = response.text.replace(/^```json\s*/, '');
    chap = chap.replace(/```$/, '')
    chap = sanitizeJsonString(chap)
    output[`Chapter 1`] = chap;
    // console.log(output[`Chapter 1`]);

    // image_prompt = await generateDallePrompt(response.text);

// Generate subsequent chapters
    for (let i = 2; i <= total_chapters; i++) {
        new_res = await chain.invoke({
        question: `Now Generate Chapter ${i} with ${paragraphs} Paragraphs and Each Paragraph should be equal to ${words}
        Provide the following chapter details in JSON format. Ensure the output is in a proper JSON format:
        \`\`\`json
        {{
          "Chapter Number": "Chapter number here",
          "Chapter Name": "Chapter name here",
          "Story": "Story content here"
        }}
        \`\`\`
        Do not include any other text or explanations. Only provide the JSON response.
        `,
        });
        chap = new_res.text.replace(/^```json\s*/, '');
        chap = chap.replace(/```$/, '')
        chap = sanitizeJsonString(chap)
        // console.log(new_res.text);
        output[`Chapter ${i}`] = chap;
    }

    // var concatenatedString = "";
    // for (var key in output) {
    //     if (output.hasOwnProperty(key)) {
    //     concatenatedString += output[key];
    //     }
    // }
    // console.log(concatenatedString);
    
    // image_prompt = await generateDallePrompt(concatenatedString);
    // image_prompt = image_prompt.replace(/^```json\s*/, '');
    // image_prompt = image_prompt.replace(/```$/, '');
    
    // const jsonObject = JSON.parse(image_prompt)
    
    // for (var key in jsonObject) {
    // if (jsonObject.hasOwnProperty(key)) {
    //     output[`${key} Image`] = await imageGeneration(jsonObject[key]);
    //     // console.log(jsonObject[key]);
    //     }
    // }
    // console.log(output);
    // console.log(output);
    
    const final = await convertData(output);
    
    story = await extractChapters(final);
    console.log(story);
    const story_title = await getStoryTitle(story);

    color = "blue/neon";

    coverPhote = await coverImageGeneration(genre,story_title,color)
    art = await artImageGeneration(genre,story_title,story,color)
    back = await backCoverImageGeneration(genre,color)
    response = {
        "story_name": story_title,
        "output": final,
        "cover" : coverPhote,
        "art": art,
        "back" : back

        
    }

    console.log(story_title);
    // const final= convertData(output);
    return response
}



async function convertData(data) {
    const result = [];
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        try {
          const jsonString = data[key]
            .replace(/\\n/g, "\\n")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\"/g, '"'); // Unescaping double quotes
  
        //   console.log(`Parsing JSON for ${key}: ${jsonString}`); // Debugging output
          const chapter = JSON.parse(jsonString);
          result.push({
            id: chapter["Chapter Number"],
            "chapter name": chapter["Chapter Name"],
            story: chapter["Story"],
            image: "any image url here"
          });
        } catch (error) {
          console.error(`Error parsing JSON for ${key}:`, error);
        }
      }
    }
    return  result;
  }
 
function sanitizeJsonString(jsonString) {
    return jsonString
        .replace(/\\n/g, '\\n')
        .replace(/\\'/g, '\\\'')
        .replace(/\\"/g, '\\"')
        .replace(/\\&/g, '\\&')
        .replace(/\\r/g, '\\r')
        .replace(/\\t/g, '\\t')
        .replace(/\\b/g, '\\b')
        .replace(/\\f/g, '\\f')
        .replace(/[\u0000-\u0019]+/g, "")
        .replace(/\n/g, "")
        .replace(/`/g, "\"");
}

async function extractChapters(storyArray) {
  let concatenatedStory = "";

  storyArray.forEach(chapter => {
      // let chapterName = chapter['chapter name'];
      let story = chapter['story'];
      concatenatedStory += `${story}\n\n`;
  });

  return concatenatedStory.trim();
}

async function sotryTittle(input) {
    const model = new OpenAI({
      model: "gpt-4o",
      temperature: 0,
      apiKey: process.env.OPENAI_API_KEYS,
    });
  
    const final_input = `
    **Role:** You are specialized in creating engaging and captivating story titles.
    You will be given chapters of a story book and you have to generate one title for the story book.

    **Task:** Generate a compelling story title based on the given chapters content.
    
    **Step-by-Step Guide:**
    
    1. **Read the Chapters Content:**
       - Carefully read the provided chapter content to understand the main events, characters, and themes.
    2. ** Appropriate genre extractions:**
       - Identify the appropriate genre for the story based on the chapters content. Your title should reflect the genre.
    3. **Identify Key Elements:**
       - Identify the most significant elements of the chapter that should be highlighted in the title. This could include major plot points, character developments, or central themes.
    
    3. **Create the Title:**
       - Based on your understanding, create a title that is engaging, descriptive, and fitting for the chapters. Ensure the title is concise (preferably 3-5 words) and intriguing enough to draw readers in.
    
    **Output Instructions:**
    - Provide only obe title for the story book.
    - Provide the generated title in quotation marks.
    - Ensure the title is no longer than 5 words.
  
      ${input}
    `;
  
    try {
      const output = await model.invoke(final_input); // Await the result of model.invoke()
      return output.content; // Return the output content
    } catch (error) {
      console.error("Error invoking the model:", error);
      throw error; // Re-throw the error to be handled by the caller if needed
    }
  }

  async function getStoryTitle(inputData) {
    try {
      const dd = await sotryTittle(inputData); // Await the result of sotryTittle
      return dd; // Return the resolved value
    } catch (error) {
      console.error("Error:", error);
      throw error; // Re-throw the error to be handled by the caller if needed
    }
  }
  
  




module.exports = storyGeneration;

// console.log(convertData(data))