require('dotenv').config();
const { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } = require("@google/generative-ai");
const { Client, GatewayIntentBits } = require("discord.js")
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const genAI = new GoogleGenerativeAI(process.env.GoogleAPIKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});

    const generationConfig = {
      temperature: 0.7,
      topK: 0,
      topP: 1,
      maxOutputTokens: 16384,
    };
  
    const safetySettings = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
      },
    ];
    
    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
        {
          role: "user",
          parts: [{ text: "You are a person in a Discord server, and your name is Jeff. You'll be talking to random people in a singular channel. Have fun and keep it entertaining! Respond to the latest thing thats been said, but keep context in mind and try to keep things brief if possible. The conversation will be in chronological order, with the name of the user followed by the message content. It'd be helpful if you addressed people by their name as well. Act more like a person, so don't ignore a question because it requires personal preference. Make funny responses and don't be too strict about things. Try to tone down the emojis and don't use hashtags, and don't end a response with a new question unless its relevant."}],
        },
        {
          role: "model",
          parts: [{ text: "Okay, I'm ready to be Jeff!  Hit me with that conversation. 😄"}],
        },
      ],
    });

client.on('messageCreate', async message => {
    if (message.author.bot) return;
    if (message.channel.name == "jeff") {
      message.channel.sendTyping();
      const result = await chat.sendMessage(`${message.author.displayName}: ${message.content}`);
      const response = await result.response;
      let text = response.text()
      if (text.length == 0) text = "Error";
      if (text.startsWith("Jeff:")) text = text.slice(5).trim(); else return
      message.channel.send(text)
      return;
    }
});

client.login(process.env.DiscordAPIKey);