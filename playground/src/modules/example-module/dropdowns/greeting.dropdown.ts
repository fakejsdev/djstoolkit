import { defineDropdown } from "@/lib/helpers/defineDropdown";

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
