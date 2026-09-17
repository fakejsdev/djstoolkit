import { defineDropdown } from "@/lib/helpers/defineDropdown";

/*
  info.dropdown.ts — Select Menu component handler example
  Handles INFO_DROPDOWN customId and replies with guild or user details based on choice.
*/

export const { config, run } = defineDropdown(
  {
    customId: "INFO_DROPDOWN",
    name: "Info Select Menu Handler",
    description: "Responds with guild or user details when an option is selected",
  },
  async (interaction) => {
    const [selectedValue] = interaction.values;

    switch (selectedValue) {
      case "GUILD":
        return await interaction.reply({
          content: `### \`🏰\` Guild Info\n- **Name:** \`${interaction.guild?.name ?? "N/A"}\`\n- **Guild ID:** \`${interaction.guild?.id ?? "N/A"}\`\n- **Member Count:** \`${interaction.guild?.memberCount ?? "N/A"}\``,
          flags: ["Ephemeral"],
        });
      case "SELF":
        return await interaction.reply({
          content: `### \`👤\` User Info\n- **Tag:** \`${interaction.user.tag}\`\n- **User ID:** \`${interaction.user.id}\`\n- **Created:** <t:${Math.floor(interaction.user.createdTimestamp / 1000)}:R>`,
          flags: ["Ephemeral"],
        });
      default:
        return await interaction.reply({
          content: "Unknown option selected.",
          flags: ["Ephemeral"],
        });
    }
  },
);
