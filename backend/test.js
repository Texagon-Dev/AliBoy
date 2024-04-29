const { ChatOpenAI } = require("@langchain/openai");

const prompt = `
### Chapter 1: The Awakening\n\nIn the year 3075, humanity had transcended its earthly bounds, reaching out to the stars in a quest for knowledge and expansion. Among the pioneers of this interstellar age were five individuals, each remarkable in their own right, destined to embark on a journey that would etch their names into the annals of cosmic exploration. Captain Elias Ford, a seasoned astronaut with a gaze as piercing as the void of space, led the expedition aboard the starship Odyssey. His leadership was complemented by the genius of Dr. Leo Zimmerman, a theoretical physicist whose theories on wormhole navigation had made faster-than-light travel a reality. Their mission was to investigate a mysterious signal emanating from the Andromeda Galaxy, a task that required not just scientific prowess but also the courage to face the unknown.\n\nAccompanying them were Lieutenant Maya Jensen, a skilled pilot with reflexes as sharp as her wit, and Engineer Ava Singh, whose innovations in quantum computing had revolutionized space travel. Rounding out the crew was Sergeant Alex Reed, a former marine turned security officer, whose strategic acumen and physical prowess ensured the safety of the mission. Together, they represented humanity's best hope, a beacon of intellect and bravery venturing into the uncharted. As the Odyssey slipped through the cosmic veil, leaving behind the familiar constellations of the Milky Way, a sense of anticipation filled the air. The crew knew that what lay ahead could redefine humanity's understanding of the universe, or it could end in catastrophe. Yet, driven by curiosity and the unyielding human spirit, they pressed on, guided by the mysterious signal that promised to unveil the secrets of the cosmos.\n\nThe journey was not without its challenges. Navigating through asteroid fields, evading cosmic storms, and deciphering the alien signal tested the crew's resolve and ingenuity. Dr. Zimmerman's theories were put to the ultimate test as they approached a massive wormhole, the gateway to Andromeda. It was a moment of truth that could validate years of theoretical work or spell doom for the mission. With Lieutenant Jensen at the helm, the Odyssey maneuvered into the wormhole, its structure groaning under the gravitational forces. The crew held their breath, suspended in a tunnel of swirling colors and unfathomable energies, a sight that challenged their understanding of reality. As they emerged on the other side, a new galaxy unfolded before them, its stars and planets a canvas of possibilities waiting to be discovered.\n\nThe signal, now stronger, guided them to a planet unlike any in the Milky Way. It was a world of floating islands, interconnected by bridges of light, a testament to the advanced civilization that awaited them. The crew's excitement was palpable as they prepared to make contact, their minds racing with questions. Who were the architects of this world? What secrets did they hold? And most importantly, what message had they sent across the vastness of space, calling out to distant kin? As the Odyssey descended towards the planet, its crew ready to step into the unknown, they knew that they were not just explorers but messengers of a new era of human achievement and interstellar brotherhood. The mysteries of Andromeda beckoned, and with hearts full of hope and eyes wide with wonder, they answered the call, stepping into a future where the boundaries of knowledge and existence were limitless.
`
async function main() {
  const model = new ChatOpenAI({ temperature: 0 , apiKey: process.env.OPENAI_API_KEY  , model: "gpt-4-0125-preview" });
  const res = await model.invoke(
    ` Role:
    You are a expert prompt engineer for Dall-E. You are a assistant of seasoned Storybook writer who writes storybooks and its stories contains different chapters.
    It requires images for replicate its chapter content in a image.

    Your Task: You will Generate a detailed prompt to generate an image for storybook chapter.
    
    Chapter content : ${prompt}
    Steps to do the task:
    1. Summarize the storybook chapter.
    2. After summarizing understand what is going on in the summary.
    3. Start the prompt with the word 'Imagine'.

    Image Style: Keep the iamge style to disnep style.

    Output:
    Yourfinal output is a perfect prompt to generate an image for storybook chapter that best matches the storyline.
  `
  );
  console.log( res.content );
}

main();


// Role:
//       You are a expert prompt engineer for Dall-E. You are a assistant of seasoned Storybook writer who writes storybooks and its stories contains different chapters.
//       It requires images for replicate its chapter content in a image.

//       Your Task: You will Generate a detailed prompt to generate an image for storybook chapter.

      

//       Steps to do the task:
//       1. Summarize the storybook chapter.
//       2. After summarizing understand what is going on in the summary.
//       3. Start the prompt with the word 'Imagine'.

//       Image Style: Keep the iamge style to disnep style.

//       Output:
//       Yourfinal output is a perfect prompt to generate an image for storybook chapter that best matches the storyline.