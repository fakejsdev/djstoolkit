import { defineDropdown } from "@/lib/helpers/defineDropdown";

/*
  defineDropdown — registers a string select menu handler
  customId      — must match the customId set in StringSelectMenuBuilder
  name          — short label describing the dropdown's purpose
  description   — what the dropdown does

  interaction.values contains the selected option values defined in StringSelectMenuOptionBuilder
*/

export const { config, run } = defineDropdown(
  {
    customId: "GREETING_DROPDOWN",
    name: "Pick a greeting",
    description: "Picks a greeting",
  },
  async (interaction) => {
    const selected = interaction.values[0];

    switch (selected) {
      case "hello":
        await interaction.reply("HELLO!!!");
        break;
      case "bye":
        await interaction.reply("Bye:(");
        break;
    }
  },
);
