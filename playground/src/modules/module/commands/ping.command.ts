import { ActionRowBuilder, ModalBuilder, TextInputBuilder, TextInputStyle } from "discord.js";
import { defineCommand } from "@/lib/helpers/defineCommand";

export const { config, run } = defineCommand(
  {
    name: "ping",
    description: "hello",
  },
  async (interaction) => {
    const modal = new ModalBuilder().setCustomId("REPORT_BUG_MODAL").setTitle("Report a Bug");

    const textInput = new TextInputBuilder()
      .setCustomId("bug_description")
      .setLabel("What happened?")
      .setStyle(TextInputStyle.Paragraph)
      .setRequired(true);

    const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(textInput);

    modal.addComponents(actionRow);

    await interaction.showModal(modal);
  },
);
