import { BotConfigType } from "tstypes/config";
import * as fs from "fs";
import * as path from "path";

const config: BotConfigType = {
	loginToken:
		"Enter your Discord bot login token here, you can generate one from https://discord.com/developers/applications",
	discordServerId:
		"Enter the server ID of the Discord server here, search about how to get Discord server ID on Google to get it if you don't know",
	roles: {
		"👍": { roleId: "753380582100172930", roleName: "Role 1" },
		"😊": { roleId: "753380635757903924", roleName: "Role 2" },
		"😂": { roleId: "753380680523841606", roleName: "Role 3" },
	},
};

const localConfigPath = path.join(__dirname, "config.local.ts");

//Load local config if exists, it's essential in loading bot config file because the login token needs to be set so bot can login.
if (fs.existsSync(localConfigPath)) {
	Object.assign(config, require(localConfigPath));
}

export = config;
