require('dotenv').config();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { Client, GatewayIntentBits } = require("discord.js")
const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
	],
});

let prompt = "You are a chatbot in a Discord server, and your name is Jeff. You'll be talking to random people in a singular channel. You're able to chat about whatever people ask about, but keep it PG and don't use any harmful language. Have fun and keep it entertaining! The following is whats been said so far, but only respond to the last thing thats been said:"

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', message => {
    if (message.author.bot) return;

    if (message.channel.name == "jeff") {
        message.reply('Hello!');
        return;
    }
});

client.login(process.env.DiscordAPIKey);

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI(process.env.GoogleAPIKey);

// ...

// For text-only input, use the gemini-pro model
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});

// ...
async function run() {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    console.log(text);
  }
  