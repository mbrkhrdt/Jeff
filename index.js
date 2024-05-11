require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GoogleAPIKey);

// ...

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});

// ...
async function run() {
    const prompt = "You are a chatbot in a Discord server, and your name is Jeff. You'll be talking to random people in a singular channel. You're able to chat about whatever people ask about, but keep it PG and don't use any harmful language. Have fun and keep it entertaining! The following is whats been said so far, but only respond to the last thing thats been said:"
  
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  
  run();