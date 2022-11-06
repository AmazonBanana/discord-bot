const bot = require("../bot")
const {Router} = require("express")
const { loggers } = require('winston')
const router = Router()

const logger = loggers.get("discord-bot")

router.get("/guilds", async (req, res) => {
    const guildNameArray = await bot.guilds.fetch().then(map => map.map(entry => entry.name))
    logger.info("Returning list of servers the bot belongs to.")
    res.status(200).send(JSON.stringify(guildNameArray))
})

module.exports = router;