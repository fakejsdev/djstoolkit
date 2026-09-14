import { enqueueJob } from "@/lib/bullmq";
import { defineCommand } from "@/lib/helpers/defineCommand";

/*
  RemindWorkData — export this type and import it in the worker for shared typesafety
  enqueueJob    — adds a job to the queue; third argument accepts any BullMQ JobsOptions
  delay         — milliseconds before the worker picks up the job
*/

export type RemindWorkData = {
  channelId: string;
  reminder: string;
};

export const { config, run } = defineCommand(
  {
    name: "remind",
    description: "Schedule a reminder in 10s to be sent at this channel",
  },
  async (interaction) => {
    await enqueueJob(
      "remind",
      { channelId: interaction.channel?.id, reminder: "take out laundry!" },
      { delay: 10 * 1000 },
    );

    return await interaction.reply("Scheduled reminder!");
  },
);
