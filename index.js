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

const genAI = new GoogleGenerativeAI(process.env.GoogleAPIKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro"});


let prompt = "You are a chatbot in a Discord server, and your name is Jeff. You'll be talking to random people in a singular channel. You're able to chat about whatever people ask about, but keep it PG and don't use any harmful language. Have fun and keep it entertaining! The following is whats been said so far, respond to the last thing thats been said but keep the previous context in mind. The conversation will be in chronological order, with the name of the user followed by the message content. It'd be helpful if you addressed people by their name as well."

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async message => {
    if (message.author.bot) return;

    if (message.channel.name == "jeff") {
        prompt = prompt + `${message.author.displayName}: ${message.content}`
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = response.text();
        if (text.startsWith("Jeff:")) text = text.slice(5).trim(); else return
        message.reply(text);
        prompt = prompt + `Jeff: ${text}`
        return;
    }
});

client.login(process.env.DiscordAPIKey);