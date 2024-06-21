const request = require('request');

async function generateImage(apiKey, prompt, negativePrompt, width = 1024, height = 1024, samples = 1, numInferenceSteps = 20, guidanceScale = 7.5) {
  const options = {
    method: 'POST',
    url: 'https://stablediffusionapi.com/api/v3/text2img',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      key: apiKey,
      prompt: prompt,
      negative_prompt: negativePrompt,
      width: width,
      height: height,
      samples: samples.toString(),
      num_inference_steps: numInferenceSteps.toString(),
      seed: null,
      guidance_scale: guidanceScale,
      safety_checker: "yes",
      multi_lingual: "no",
      enhance_prompt: "yes",
      panorama: "no",
      self_attention: "no",
      upscale: "no",
      embeddings_model: null,
      webhook: null,
      track_id: null
    })
  };

  return new Promise((resolve, reject) => {
    request(options, (error, response) => {
      if (error) {
        reject(error);
      } else {
        const data = JSON.parse(response.body);
        resolve(data);
      }
    });
  });
}

async function main() {
  try {
    const apiKey = "16UDv016ImrtVMokvxTyR1ZYCqo5SC0bSfle48f2OQYmxzSuPMh0sfVFIwyi";
    const prompt = "create illustrations for horror genre of storybook.the design should be abstract ";
    const negativePrompt = "faces";
    
    const data = await generateImage(apiKey, prompt, negativePrompt);

    console.log(`Status: ${data.status}`);
    console.log(`Tip: ${data.tip}`);
    console.log(`Generation Time: ${data.generationTime}`);
    console.log(`ID: ${data.id}`);
    console.log(`Output: ${data.output.join(', ')}`);
    console.log(`Proxy Links: ${data.proxy_links.join(', ')}`);
    console.log(`NSFW Content Detected: ${data.nsfw_content_detected}`);

    console.log(`Meta Information:`);
    for (const [key, value] of Object.entries(data.meta)) {
      console.log(`  ${key}: ${value}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

main();



