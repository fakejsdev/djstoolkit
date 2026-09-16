import { defineDropdown } from "@/lib/helpers/defineDropdown";
import { DROPDOWNS } from "../types";

export const { config, run } = defineDropdown(
  {
    customId: DROPDOWNS.INFO_DROPDOWN,
    name: "Info Dropdown",
    description: "Sends info depending on selected op.",
  },
  async (interaction) => {
    const [value] = interaction.values;

    switch (value) {
      case "GUILD":
        await interaction.reply({
          content: `Guild Name: **${interaction.guild?.name}** (ID: ${interaction.guild?.id})`,
          ephemeral: true,
        });
        break;
      case "SELF":
        await interaction.reply({
          content: `Your Tag: **${interaction.user.tag}** (ID: ${interaction.user.id})`,
          ephemeral: true,
        });
        break;
      default:
        await interaction.reply({
          content: "Unknown option selected.",
          ephemeral: true,
        });
    }
  },
);
