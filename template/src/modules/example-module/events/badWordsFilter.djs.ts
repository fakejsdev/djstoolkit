import type { GuildTextBasedChannel } from "discord.js";
import { defineEvent } from "@/lib/helpers/defineEvents";

export const { config, run } = defineEvent(
  {
    on: "messageCreate",
    name: "bad-words",
    description: "do not curse!",
  },
  async (message) => {
    const badWords = ["moist", "synergy", "cringe", "yeet", "rizz", "delulu", "sus", "skibidi"];

    if (!badWords.includes(message.content)) return;

    await message.delete();

    const channel = message.channel as GuildTextBasedChannel;
    return await channel.send({
      content: "Do not curse!",
    });
  },
);
