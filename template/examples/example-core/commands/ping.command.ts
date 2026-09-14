import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { defineCommand } from "@/lib/helpers/defineCommand";

/*
  defineCommand — registers a slash command handler
  name        — command name used to invoke it (e.g. /ping)
  description — short description shown in Discord

  customId in ButtonBuilder/StringSelectMenuBuilder must match the customId
  defined in the corresponding defineButton/defineDropdown handler
*/

export const { config, run } = defineCommand(
  {
    name: "ping",
    description: "Ping, pong!",
  },
  async (interaction) => {
    const button = new ButtonBuilder()
      .setCustomId("HELLO_BUTTON")
      .setLabel("Click me!")
      .setStyle(ButtonStyle.Primary);

    const dropdown = new StringSelectMenuBuilder()
      .setCustomId("GREETING_DROPDOWN")
      .setPlaceholder("Select me!")
      .addOptions([
        new StringSelectMenuOptionBuilder().setValue("hello").setLabel("Hello!"),
        new StringSelectMenuOptionBuilder().setValue("bye").setLabel("Bye:("),
      ]);

    return await interaction.reply({
      content: "Pong!",
      components: [
        new ActionRowBuilder<ButtonBuilder>({
          components: [button],
        }),
        new ActionRowBuilder<StringSelectMenuBuilder>({
          components: [dropdown],
        }),
      ],
    });
  },
);
