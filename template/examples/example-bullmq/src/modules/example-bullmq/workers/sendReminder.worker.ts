import type { GuildTextBasedChannel } from "discord.js";
import { client } from "@/lib/discord";
import { defineWorker } from "@/lib/helpers/defineWorker";

/*
  defineWorker(config, run)
  Registers a BullMQ worker to process background jobs.

  config:
    - name: Must match the job name registered in JobRegistry (e.g. "send-reminder")
    - description: Explains what this background worker does

  run:
    - (job) => unknown | Promise<unknown>
    - job.data: Fully typed payload based on JobRegistry["send-reminder"]

  See example below:
*/

export const { config, run } = defineWorker(
  {
    name: "send-reminder",
    description: "Sends a delayed reminder message to the target channel",
  },
  async (job) => {
    const { channelId, reminder } = job.data;

    const channel = (client.channels.cache.get(channelId) ??
      (await client.channels.fetch(channelId))) as GuildTextBasedChannel | null;

    if (!channel) return;

    await channel.send(`\`⏰\` **Reminder:** ${reminder}`);
  },
);
