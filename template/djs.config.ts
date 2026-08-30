import { ActivityType, GatewayIntentBits, Partials } from "discord.js";
import { defineConfig } from "@/lib/helpers/defineConfig";

export const config = defineConfig({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
	],
	partials: [Partials.Channel, Partials.GuildMember, Partials.Message],
	modulesDir: "src/modules",

	handlers: { all: true },

	presence: {
		status: "online",
		activity: {
			type: ActivityType.Playing,
			name: "with Djs Toolkit",
		},
	},

	logLevel: "debug",
});
