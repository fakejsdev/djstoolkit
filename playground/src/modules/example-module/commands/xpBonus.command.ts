import { enqueueJob } from "@/lib/bullmq";
import { defineCommand } from "@/lib/helpers/defineCommand";

export const { config, run } = defineCommand(
  {
    name: "xp-bonus",
    description: "Schedules a bonus XP giveaway in 5 minutes",
  },
  async (interaction) => {
    await enqueueJob("give-xp-bonus", { amount: 100 }, { delay: 5 * 60 * 1000 });

    return await interaction.reply("🎉 Everyone gets +100 XP in 5 minutes!");
  },
);
