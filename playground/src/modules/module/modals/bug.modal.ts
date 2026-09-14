import { defineModal } from "@/lib/helpers/defineModal";

export const { config, run } = defineModal(
  {
    customId: "REPORT_BUG_MODAL",
    name: "Bug Report Modal",
    description: "Handles bug reports submitted by users",
  },
  async (interaction) => {
    const description = interaction.fields.getTextInputValue("bug_description");

    await interaction.reply({
      content: `Thanks for the report!\n**You wrote:** ${description}`,
    });
  },
);
