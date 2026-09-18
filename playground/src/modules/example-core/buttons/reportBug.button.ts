import {
  LabelBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { defineButton } from "@/lib/helpers/defineButton";

/*
  reportBugBtn.button.ts — Button handler opening a Modal
  Listens to REPORT_BUG_MODAL button click and presents the modal form to the user.
*/

export const { config, run } = defineButton(
  {
    customId: "REPORT_BUG_MODAL",
    name: "Report Bug Button Handler",
    description: "Opens the bug report modal form when clicked",
  },
  async (interaction) => {
    const modal = new ModalBuilder()
      .setCustomId("BUG_REPORT_SUBMIT")
      .setTitle("Report a Bug")
      .addLabelComponents(
        new LabelBuilder()
          .setLabel("Title")
          .setDescription("Short title describing the issue")
          .setTextInputComponent(
            new TextInputBuilder()
              .setCustomId("BUG_TITLE")
              .setStyle(TextInputStyle.Short)
              .setPlaceholder("e.g. Ping command fails...")
              .setRequired(true),
          ),
        new LabelBuilder()
          .setLabel("Description")
          .setDescription("Detailed description of what went wrong")
          .setTextInputComponent(
            new TextInputBuilder()
              .setCustomId("BUG_DESCRIPTION")
              .setStyle(TextInputStyle.Paragraph)
              .setPlaceholder("Provide step-by-step details...")
              .setRequired(true),
          ),
        new LabelBuilder()
          .setLabel("Category")
          .setDescription("Select bug category")
          .setStringSelectMenuComponent(
            new StringSelectMenuBuilder()
              .setCustomId("TICKET_CATEGORY")
              .setPlaceholder("Select category...")
              .setRequired(true)
              .addOptions([
                {
                  label: "Bot Bug",
                  value: "BOT_BUG",
                  description: "Issue with bot functionality",
                },
                {
                  label: "UI / Display",
                  value: "UI_ISSUE",
                  description: "Issue with embeds or components",
                },
              ]),
          ),
      );

    return await interaction.showModal(modal);
  },
);
