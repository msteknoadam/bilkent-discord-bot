import { BotConfigType } from "tstypes/config";
import * as fs from "fs";
import * as path from "path";

const config: BotConfigType = {
	loginToken:
		"Enter your Discord bot login token here, you can generate one from https://discord.com/developers/applications",
};

const localConfigPath = path.join(__dirname, "config.local.ts");

//Load local config if exists, it's essential in loading bot config file because the login token needs to be set so bot can login.
if (fs.existsSync(localConfigPath)) {
	Object.assign(config, require(localConfigPath));
}

export = config;
