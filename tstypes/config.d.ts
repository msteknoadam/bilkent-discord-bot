export interface BotConfigType {
	loginToken: string;
	discordServerId: string;
	roles: {
		[s: string]: {
			roleId: string;
			roleName: string;
		};
	};
}
