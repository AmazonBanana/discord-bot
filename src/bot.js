const config = require("../rsc/config.json");
const { loggers } = require('winston')
const logger = loggers.get("discord-bot")
const { Client, Events, GatewayIntentBits } = require('discord.js');

// Create a new client instance
const bot = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
bot.once(Events.ClientReady, c => {
	logger.info(`Discord Bot Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
bot.login(config.token);

module.exports = bot;