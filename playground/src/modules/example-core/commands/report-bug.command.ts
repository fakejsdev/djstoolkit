import {
  LabelBuilder,
  ModalBuilder,
  StringSelectMenuBuilder,
  TextInputBuilder,
  TextInputStyle,
} from "discord.js";
import { defineCommand } from "@/lib/helpers/defineCommand";
import { MODALS } from "../types";

export const { config, run } = defineCommand(
  {
    name: "report-bug",
    description: "Opens a modal to report a bug",
  },
  async (interaction) => {
    const modal = new ModalBuilder()
      .setCustomId(MODALS.REPORT_BUG)
      .setTitle("Report a Bug")
      .addLabelComponents(
        new LabelBuilder()
          .setLabel("What's the issue?")
          .setDescription("Shorty describe what's wrong")
          .setTextInputComponent(
            new TextInputBuilder()
              .setRequired(true)
              .setCustomId("BUG_TITLE")
              .setStyle(TextInputStyle.Short)
              .setPlaceholder("This bot is buggy..."),
          ),
        new LabelBuilder()
          .setLabel("Brief about the issue")
          .setDescription("Provide as much details as you can")
          .setTextInputComponent(
            new TextInputBuilder()
              .setRequired(true)
              .setCustomId("BUG_DESCRIPTION")
              .setStyle(TextInputStyle.Paragraph)
              .setPlaceholder("I can't..."),
          ),
        new LabelBuilder()
          .setLabel("Select Category")
          .setDescription("Select category of the issue")
          .setStringSelectMenuComponent(
            new StringSelectMenuBuilder()
              .setRequired(true)
              .setCustomId("TICKET_CATEGORY")
              .setPlaceholder("Select correct category")
              .addOptions([
                {
                  label: "Admin Report",
                  value: "ADMIN_REPORT",
                  description: "Report an abuse.",
                },
                {
                  label: "Bot Bug",
                  value: "BOT_BUG",
                  description: "Bot is buggy",
                },
              ]),
          ),
      );

    return await interaction.showModal(modal);
  },
);
