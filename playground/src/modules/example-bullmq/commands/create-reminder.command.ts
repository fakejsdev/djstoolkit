import { enqueueJob } from "@/lib/bullmq";
import { defineCommand } from "@/lib/helpers/defineCommand";

/*
  defineCommand(config, run)
  For full command docs, see example-core/commands/basic.command.ts

  create-reminder.command.ts — BullMQ feature live example
  Demonstrates enqueuing a delayed background job using BullMQ and enqueueJob.

  See example below:
*/

export const { config, run } = defineCommand(
  {
    name: "create-reminder",
    description: "Schedules a delayed reminder message to be sent to this channel",
    options: [
      {
        type: "String",
        name: "message",
        description: "The reminder text to send",
        required: true,
      },
      {
        type: "Integer",
        name: "seconds",
        description: "Seconds to wait before sending the reminder (defaults to 10)",
        required: false,
      },
    ],
  },
  async (interaction) => {
    const message = interaction.options.getString("message", true);
    const seconds = interaction.options.getInteger("seconds") ?? 10;

    await enqueueJob(
      "send-reminder",
      {
        channelId: interaction.channelId,
        reminder: message,
      },
      { delay: seconds * 1000 },
    );

    return await interaction.reply({
      content: `\`⏱️\` Reminder scheduled! Will send: "${message}" in **${seconds}s**.`,
      flags: ["Ephemeral"],
    });
  },
);
