import * as Discord from "discord.js";
import CONFIG from "./config";

const bot = new Discord.Client();

bot.on("ready", () => {
	console.log(`${bot.user?.username} is now online on ${bot.guilds.cache.size} servers!`);
});

bot.on("message", (message) => {
	if (message.content.startsWith("++eval")) eval(message.content.replace(/\+\+eval /g, "")); // Added for testing purposes only right now
});

bot.on("guildMemberAdd", (member) => {
	member.user?.send(`Merhaba, Bilkent Discord sunucusuna hoş geldin **${member.user?.username}**!`);
});

bot.login(CONFIG.loginToken);
