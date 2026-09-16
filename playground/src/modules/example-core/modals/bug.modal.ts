import { defineModal } from "@/lib/helpers/defineModal";
import { MODALS } from "../types";

export const { config, run } = defineModal(
  {
    customId: MODALS.REPORT_BUG,
    name: "Report Bug Modal",
    description: "Action after modal submission",
  },
  async (interaction) => {
    const title = interaction.fields.getTextInputValue("BUG_TITLE");
    const description = interaction.fields.getTextInputValue("BUG_DESCRIPTION");

    const selectedCategory = interaction.fields.getStringSelectValues("TICKET_CATEGORY");

    return await interaction.reply({
      content: `### 📩 Bug Report Received!\n**Title:** ${title}\n**Category:** \`${selectedCategory}\` \n**Description:** ${description}`,
      flags: ["Ephemeral"],
    });
  },
);
