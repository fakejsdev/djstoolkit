import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { createSessionId } from "@/lib/discord/session";
import { defineCommand } from "@/lib/helpers/defineCommand";
import { setStore } from "@/lib/store";

/*
  defineCommand(config, run)
  For full command docs, see example-core/commands/basic.command.ts

  claimCode.command.ts — In-Memory Store feature live example
  Demonstrates storing temporary state with TTL and attaching a session token to a button.

  See example below:
*/

export const { config, run } = defineCommand(
  {
    name: "claim-code",
    description: "Generates a single-use secret code expiring in 30 seconds",
  },
  async (interaction) => {
    const customIdWithSession = createSessionId("CLAIM_CODE");

    const [, sessionId] = customIdWithSession.split(":");

    setStore(
      sessionId!,
      {
        secretCode: "SECRET-9876",
        reward: "100 Gold Coins",
        generatedBy: interaction.user.tag,
      },
      30 * 1000,
    );

    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(customIdWithSession)
        .setLabel("Claim Secret Code (30s TTL)")
        .setStyle(ButtonStyle.Success),
    );

    return await interaction.reply({
      content: "Click the button below to claim your secret code (expires in 30s):",
      components: [button],
      flags: ["Ephemeral"],
    });
  },
);
