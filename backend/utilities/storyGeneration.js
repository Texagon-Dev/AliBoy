const { LLMChain } = require("langchain/chains");
const OpenAI = require("../utilities/openai");
const { generateDallePrompt } = require("../utilities/generateDallePrompt");
const { imageGeneration } = require("../utilities/imageGeneration");
const { BufferMemory } = require("langchain/memory");
const {ChatPromptTemplate,MessagesPlaceholder,} = require("@langchain/core/prompts");

async function storyGeneration(prompt,final_input,total_chapters){

    let memory = new BufferMemory({
      returnMessages: true,
      memoryKey: "chat_history",
    });

    const llm = OpenAI();

    const chatPrompt = ChatPromptTemplate.fromMessages([
    [
        "system",
        `${prompt}`
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
    response = await chain.invoke({question: final_input,});
    output[`Chapter 1`] = response.text;

    // image_prompt = await generateDallePrompt(response.text);

// Generate subsequent chapters
    for (let i = 2; i <= total_chapters; i++) {
        new_res = await chain.invoke({
        question: `Now Generate Chapter ${i}`,
        });
        output[`Chapter ${i}`] = new_res.text;
    }

    var concatenatedString = "";
    for (var key in output) {
        if (output.hasOwnProperty(key)) {
        concatenatedString += output[key];
        }
    }
    
    image_prompt = await generateDallePrompt(concatenatedString);
    image_prompt = image_prompt.replace(/^```json\s*/, '');
    image_prompt = image_prompt.replace(/```$/, '');
    
    const jsonObject = JSON.parse(image_prompt)
    
    for (var key in jsonObject) {
    if (jsonObject.hasOwnProperty(key)) {
        output[`${key} Image`] = await imageGeneration(jsonObject[key]);
        // console.log(jsonObject[key]);
        }
    }
    // console.log(output);
    const final = await convertData(output,total_chapters)

    return final
}

async function convertData(inputData,total_chapters) {
    const outputArray = [];
    for (let i = 1; i <= total_chapters; i++) {
        const chapter = "Chapter " + i;
        const image = chapter + " Image";
        outputArray.push({
            id: i,
            chapter: inputData[chapter],
            image: inputData[image]
        });
    }
    return { output: outputArray };
}

module.exports = storyGeneration;