import * as Discord from "discord.js";
import CONFIG from "./config";

const bot = new Discord.Client();

bot.on("ready", () => {
	console.log(`${bot.user?.username} is now online on ${bot.guilds.cache.size} servers!`);
});

bot.on("message", (message) => {
	if (message.system || message.author.bot) return;
	if (message.channel.type === "text") {
		// text is when the bot gets message from a server channel
		if (message.content.startsWith("++eval")) eval(message.content.replace(/\+\+eval /g, "")); // Added for testing purposes only right now
	} else if (message.channel.type === "dm") {
		// Null checks are currently hard-coded but will be changed in next versions
		const bilkentServer = bot.guilds.cache.find((guild) => guild.id === CONFIG.discordServerId);
		const serverUser = bilkentServer?.members.cache.find((user) => user.id === message.author.id);
		serverUser?.setNickname(`${message.content} | ${serverUser.displayName}`);
		message.channel.send(`Adını bana bildirdiğin için teşekkürler **${message.content}**!`);
	}
});

bot.on("guildMemberAdd", (member) => {
	member.user?.send(
		`Merhaba, Bilkent Discord sunucusuna hoş geldin **${member.user?.username}**! Bana lütfen buradan mesaj olarak sadece adını yazar mısın? Örneğin içeriği sadece "Göktuğ" olan bir mesaj göndermek gibi.`
	);
});

bot.login(CONFIG.loginToken);
