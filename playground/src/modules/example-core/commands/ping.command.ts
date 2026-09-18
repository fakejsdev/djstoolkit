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

/*
  ping.command.ts — Core command showcase
  Demonstrates Components V2 (ContainerBuilder, TextDisplay, Separators),
  Button components, Select Menus, and status diagnostics.
*/

export const { config, run } = defineCommand(
  {
    name: "ping",
    description: "Check current bot latency and test interactive components",
  },
  async (interaction) => {
    const buttons = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("REFRESH_PING")
        .setLabel("Refresh Ping")
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId("REPORT_BUG_MODAL")
        .setLabel("Report Bug")
        .setStyle(ButtonStyle.Secondary),
    );

    const dropdown = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("INFO_DROPDOWN")
        .setPlaceholder("Select an info option...")
        .addOptions([
          {
            label: "This Guild Info",
            value: "GUILD",
            description: "Get information about the current guild",
          },
          {
            label: "Self Info",
            value: "SELF",
            description: "Get information about your account",
          },
        ]),
    );

    const container = new ContainerBuilder()
      .addTextDisplayComponents([
        new TextDisplayBuilder({
          content: "## `🏓` Pong!\n> Welcome to **djstoolkit** interactive status check.",
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
          content: `### \`📊\` Diagnostics\n- **WebSocket Latency:** \`${client.ws.ping}ms\`\n- **Status:** \`Operational\``,
        }),
      ])
      .addSeparatorComponents([
        new SeparatorBuilder({
          divider: false,
          spacing: SeparatorSpacingSize.Small,
        }),
      ])
      .addActionRowComponents([buttons])
      .addSeparatorComponents([
        new SeparatorBuilder({
          divider: true,
          spacing: SeparatorSpacingSize.Large,
        }),
      ])
      .addTextDisplayComponents([
        new TextDisplayBuilder({
          content: "### `ℹ️` Public Info\n> Select an option below to view server or user details:",
        }),
      ])
      .addSeparatorComponents([
        new SeparatorBuilder({
          divider: false,
          spacing: SeparatorSpacingSize.Small,
        }),
      ])
      .addActionRowComponents([dropdown]);

    return await interaction.reply({
      components: [container],
      flags: ["IsComponentsV2"],
    });
  },
);
