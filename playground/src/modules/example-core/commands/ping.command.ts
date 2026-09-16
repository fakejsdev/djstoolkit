import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ContainerBuilder,
  SeparatorBuilder,
  SeparatorSpacingSize,
  StringSelectMenuBuilder,
  TextDisplayBuilder,
} from "discord.js";
import { client } from "@/lib/discord";
import { defineCommand } from "@/lib/helpers/defineCommand";
import { BUTTONS, DROPDOWNS } from "../types";

export const { config, run } = defineCommand(
  {
    name: "ping",
    description: "Pong! Check current ping & public info",
  },
  async (interaction) => {
    const button = new ActionRowBuilder<ButtonBuilder>({
      components: [
        new ButtonBuilder()
          .setCustomId(BUTTONS.REFRESH_PING)
          .setLabel("Refresh a Ping")
          .setStyle(ButtonStyle.Primary),
      ],
    });

    const dropdown = new ActionRowBuilder<StringSelectMenuBuilder>({
      components: [
        new StringSelectMenuBuilder()
          .setCustomId(DROPDOWNS.INFO_DROPDOWN)
          .setPlaceholder("Choose an Option")
          .addOptions([
            {
              label: "This Guild Info",
              value: "GUILD",
              description: "Get info about this guild.",
            },
            {
              label: "Self Info",
              value: "SELF",
              description: "Get info about your self (your account)",
            },
          ]),
      ],
    });

    const container = new ContainerBuilder()
      .addTextDisplayComponents([
        new TextDisplayBuilder({
          content: "## `🏓` Pong!\n> Click button & dropdown to test handlers",
        }),
      ])
      .addSeparatorComponents([
        new SeparatorBuilder({
          divider: true,
          spacing: SeparatorSpacingSize.Large,
        }),
      ])
      .addTextDisplayComponents([
        new TextDisplayBuilder({
          content: `### Websocket Ping: ${client.ws.ping}ms\n> Refresh ping using button below`,
        }),
      ])
      .addActionRowComponents([button])
      .addSeparatorComponents([
        new SeparatorBuilder({
          divider: true,
          spacing: SeparatorSpacingSize.Large,
        }),
      ])
      .addTextDisplayComponents([
        new TextDisplayBuilder({
          content: `### Choose what you want to know\n> Select option to know more about your self/this guild`,
        }),
      ])
      .addActionRowComponents([dropdown]);

    return await interaction.reply({
      components: [container],
      flags: ["IsComponentsV2"],
    });
  },
);
