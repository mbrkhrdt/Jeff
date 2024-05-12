# Jeff
Jeff is a simple AI chatbot for Discord, built with Google Gemini. It can be funny (sometimes), and is overall just an entertaining thing to add to your Discord server.

## Configuration
Due to the limited nature of the Google Gemini free tier, there's no public bot that you can just add to your server, instead you'll need to self host it. Before you get started, you'll need your own Gemini API key as well as a Discord bot token. You can get a Gemini key [here](https://aistudio.google.com/) and a Discord bot token [here](https://discord.com/developers/applications). You'll need to make sure your Discord bot has `Server Members Intent` and `Message Content Intent` enabled. All of these things can be found underneath the Bot tab.

Once you have these keys, rename the `.env.local.example` file to just `.env.local`. You can then paste the keys into their appropriate fields. The `DiscordDevAPIKey` field can be left blank. You can also change the bots name from Jeff by changing the `BotName` field.

## Installation
1. Make sure you have [Bun](https://bun.sh) (required) & [pm2](https://pm2.keymetrics.io) (optional) installed
2. Clone the repo by running `git clone https://github.com/mbrkhrdt/Jeff`, make sure you `cd` inside of the proper directory
3. Run `bun install` to fetch all the dependencies
4. Run `bun start` to run the bot normally, or `pm2 start pm2.config.js` to run the bot using PM2, which'll make it autorestart when it crashes.

## Setup
Once you have Jeff (or whatever you named it) running, interacting with it is easy.
1. Add the bot to your Discord server. You can get an inite from the Discord Developers link in the Configuration section.
2. Create a channel named #jeff (or whatever you named it). The bot will only respond in the channel that it's named after.
3. Have fun! Sometimes Jeff will be boring, and sometimes it'll drop something really funny. It all depends on how you talk to it.

## Known Issues
- Bot only has a singular conversation thread. This means that if you add it to multiple servers, they'll all be getting the same conversation, which might not necessarily be desirable.
- Bot crashes if you make it say something that violates Gemini content policies
- No manual restart command, which would be important if the bot gets stuck on something
- Bot will often freeze if you prompt it with an extremely long message