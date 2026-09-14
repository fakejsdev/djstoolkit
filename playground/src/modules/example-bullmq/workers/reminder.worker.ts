import type { GuildTextBasedChannel } from "discord.js";
import { client } from "@/lib/discord";
import { defineWorker } from "@/lib/helpers/defineWorker";
import type { RemindWorkData } from "../commands/remind.command";

/*
  defineWorker — registers a job processor; name must match the queue name used in enqueueJob
  payload.data — raw job data cast to RemindWorkData for typesafety
  channel may not be in cache if the bot restarted after the job was enqueued
*/

export const { config, run } = defineWorker(
  {
    name: "remind",
    description: "Sends reminder",
  },
  async (payload) => {
    const data = payload.data as RemindWorkData;

    const channel = client.channels.cache.get(data.channelId) as GuildTextBasedChannel;
    if (!channel) return;

    return await channel.send(data.reminder);
  },
);
