const winston = require("winston");
const express = require("express");
const config = require("../rsc/config.json");
const { Client, Events, GatewayIntentBits } = require('discord.js');

/** Logger Declare START */
// Instantiate Winston Logger.
const logConfiguration = {
  transports: [new winston.transports.Console()],
};
const logger = winston.createLogger(logConfiguration);

logger.info(config);

/** Logger Declare END */

/** Discord Bot START */
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	logger.info(`Discord Bot Ready! Logged in as ${c.user.tag}`);
});

// Log in to Discord with your client's token
client.login(config.token);
/** Discord Bot End */

/** Express REST API START */
// Instantiate Express App.
const app = express();

// Registering routes
const adminRoute = require("./routes/admin");
app.use("/", adminRoute);

// Start Express App.
const port = config.port;
app.listen(port, () => {
  logger.info(`Bot listening to port: ${port}`);
});
/** Express REST API END */