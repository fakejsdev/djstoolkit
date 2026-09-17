import { defineModal } from "@/lib/helpers/defineModal";

/*
  bug.modal.ts — Modal submit handler
  Listens to BUG_REPORT_SUBMIT modal form submission and processes input fields.
*/

export const { config, run } = defineModal(
  {
    customId: "BUG_REPORT_SUBMIT",
    name: "Bug Report Modal Handler",
    description: "Processes bug report form submissions",
  },
  async (interaction) => {
    const title = interaction.fields.getTextInputValue("BUG_TITLE");
    const description = interaction.fields.getTextInputValue("BUG_DESCRIPTION");

    const category = interaction.fields.getStringSelectValues("TICKET_CATEGORY");

    return await interaction.reply({
      content: `### \`📩\` Bug Report Submitted!\n- **Title:** ${title}\n- **Category:** \`${category}\` \n- **Description:** ${description}`,
      flags: ["Ephemeral"],
    });
  },
);
