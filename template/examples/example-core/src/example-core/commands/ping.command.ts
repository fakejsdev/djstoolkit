import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  StringSelectMenuBuilder,
  StringSelectMenuOptionBuilder,
} from "discord.js";
import { defineCommand } from "@/lib/helpers/defineCommand";
import { BUTTONS, DROPDOWNS } from "../types";

export const { config, run } = defineCommand(
  {
    name: "ping",
    description: "Ping - pong, check current bot status",
  },
  async (interaction) => {
    const button = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder()
          .setCustomId(BUTTONS.REFRESH_BUTTON)
          .setLabel("Refresh Ping")
          .setStyle(ButtonStyle.Primary),
      ],
    });

    const dropdown = new ActionRowBuilder<StringSelectMenuBuilder>({
      components: [
        new StringSelectMenuBuilder()
          .setCustomId(DROPDOWNS.INFO)
          .setPlaceholder("Select to get more data")
          .setOptions([
            new StringSelectMenuOptionBuilder()
              .setValue(DROPDOWNS.GUILD_INFO_OP)
              .setLabel("Guild Info"),
            new StringSelectMenuOptionBuilder()
              .setValue(DROPDOWNS.SELF_INFO_OP)
              .setLabel("Self Info"),
          ]),
      ],
    });

    const wsPing = interaction.client.ws.ping;

    return await interaction.reply({
      content: `Pong! WebSocket Ping: ${wsPing}`,
      components: [button, dropdown],
    });
  },
);
