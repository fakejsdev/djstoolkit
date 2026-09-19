import { Client, GatewayIntentBits, Partials } from "discord.js";

/**
 * Main Discord.js Client instance configured with default Gateway intents and partials.
 * Used across the application to manage bot lifecycle, listen to gateway events, and make API calls.
 */
export const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel, Partials.GuildMember, Partials.Message],
});
