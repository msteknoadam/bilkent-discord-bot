import * as Discord from "discord.js";
import CONFIG from "./config";

const bot = new Discord.Client();

bot.on("ready", () => {
	console.log(`${bot.user?.username} is now online on ${bot.guilds.cache.size} servers!`);
});

bot.login(CONFIG.loginToken);
