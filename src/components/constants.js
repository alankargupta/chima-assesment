export const textGenerationPrompt = "Write content for a pdf for the following prompt, content should be formatted so that it can be inserted into a pdf later"
export const textGenerationUrl = "https://api.openai.com/v1/chat/completions"
export const imageGenerationUrl = "https://api.openai.com/v1/images/generations"
export const imageGenerationPrompt = "Generate  images for a pdf for the following prompt"
const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`);
export default myHeaders