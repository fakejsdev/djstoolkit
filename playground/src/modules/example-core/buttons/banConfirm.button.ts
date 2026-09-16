import { defineButton } from "@/lib/helpers/defineButton";
import { BUTTONS } from "../types";

export const { config, run } = defineButton(
  {
    customId: BUTTONS.CONFIRM_BAN,
    name: "Confirm a Ban",
    description: "Confirms a ban",
  },
  async (interaction, userId) => {
    if (!userId) return;

    const user = interaction.client.users.cache.get(userId);
    if (!user) return;

    // Do logic to actually ban sb

    return await interaction.reply(`Banned <@${user.id}>, ban hammer has spoken!`);
  },
);
