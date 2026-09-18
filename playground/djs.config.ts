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

  presence: {
    status: "online",
    activity: {
      type: ActivityType.Playing,
      name: "with Djs Toolkit",
    },
  },

  onError: (error, ctx) => {
    console.error(`[${ctx.source}] ${ctx.name}:`, error);
  },
  bullmq: {
    hostname: process.env.REDIS_HOSTNAME ?? "localhost",
    port: Number(process.env.REDIS_PORT ?? 6379),
    queueName: "DJSTOOLKIT_WORK_QUEUE",
  },
});
