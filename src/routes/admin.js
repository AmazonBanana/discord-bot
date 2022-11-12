const bot = require("../bot");
const { Router } = require("express");
const { loggers } = require("winston");
const router = Router();

const logger = loggers.get("discord-bot");

router.get("/guilds", async (req, res) => {
  const guildNameArray = await bot.guilds
    .fetch()
    .then((guildCollection) => guildCollection.map((entry) => entry.name));
  logger.info("Returning list of servers the bot belongs to.");
  res.status(200).send(JSON.stringify(guildNameArray));
});

router.get("/user", async (req, res) => {
  const guildId = req.query.guild;
  logger.info(`Received Guild ID: ${guildId}`);

  const guild = await bot.guilds.fetch(guildId);
  const memberList = await guild.members.fetch();

  res.status(200).send(JSON.stringify(memberList));
});

// Same code above without using async.
router.get("/user2", (req, res) => {
  const guildId = req.query.guild;
  logger.info(`Received Guild ID: ${guildId}`);

  bot.guilds.fetch(guildId).then((guild) => {
    guild.members
      .fetch()
      .then((memberList) => res.status(200).send(JSON.stringify(memberList)));
  });
});

module.exports = router;
