const { loggers, transports } = require('winston')
const express = require("express");
const config = require("../rsc/config.json");

/** Logger Declare START */
// Instantiate Winston Logger.
loggers.add('discord-bot', {
  transports: [
    new transports.Console()
  ]
})

const logger = loggers.get("discord-bot")

/** Logger Declare END */

/** Express REST API START */
// Instantiate Express App.
const app = express();

// Registering routes
const adminRoute = require("./routes/admin");
app.use("/admin", adminRoute);

// Start Express App.
const port = config.port;
app.listen(port, () => {
  logger.info(`Bot listening to port: ${port}`);
});
/** Express REST API END */