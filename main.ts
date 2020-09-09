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
		message.channel.send(
			`Adını bana bildirdiğin için teşekkürler **${message.content}**! Lütfen bir sonraki gelecek mesajda bölümüne karşılık gelen emojiye tıkla ki sunucuda sana o rolü verebilelim.`
		);
		const roleEmbed = new Discord.MessageEmbed()
			.setColor("#0099ff")
			.setTitle("Bölümünü Seç")
			.setAuthor(message.author.username, message.author.displayAvatarURL())
			.setDescription("Aşağıdaki emojilerden hangisi senin bölümünse ona 1 (bir) kez tıklaman yeterli.\n\n")
			.setTimestamp()
			.setFooter(
				`Bu bot bir açık kaynak projesidir. İstersen https://github.com/msteknoadam/bilkent-discord-bot adresinden destek olabilirsin.`
			);
		Object.keys(CONFIG.roles).forEach((roleEmoji) => {
			roleEmbed.description += `${roleEmoji}: ${CONFIG.roles[roleEmoji].roleName}\n`;
		});
		message.channel.send(roleEmbed).then((sentMessage) => {
			Object.keys(CONFIG.roles).forEach((roleEmoji) => {
				sentMessage.react(roleEmoji);
			});
		});
	}
});

bot.on("messageReactionAdd", (reaction, reactionUser) => {
	if (
		reactionUser.id !== bot.user?.id &&
		reaction.message.channel.type === "dm" &&
		reaction.message.author.id === bot.user!.id
	) {
		const reactionEmoji = reaction.emoji.name;
		if (CONFIG.roles[reactionEmoji]) {
			const bilkentServer = bot.guilds.cache.find((guild) => guild.id === CONFIG.discordServerId);
			const serverUser = bilkentServer?.members.cache.find((user) => user.id === reactionUser.id);
			serverUser?.roles.add(CONFIG.roles[reactionEmoji].roleId);
		}
	}
});

bot.on("guildMemberAdd", (member) => {
	member.user?.send(
		`Merhaba, Bilkent Discord sunucusuna hoş geldin **${member.user?.username}**! Bana lütfen buradan mesaj olarak sadece adını yazar mısın? Örneğin içeriği sadece "Göktuğ" olan bir mesaj göndermek gibi.`
	);
});

bot.login(CONFIG.loginToken);
