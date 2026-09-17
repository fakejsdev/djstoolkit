import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { createCustomIdWithData } from "@/lib/discord/session";
import { defineCommand } from "@/lib/helpers/defineCommand";

/*
  ban.command.ts — Command with permissions & prefix-routed confirmation button
  Requires Administrator permission and passes target user ID in button customId.
  The button handler is located at: example-core/buttons/banConfirm.button.ts
*/

export const { config, run } = defineCommand(
  {
    name: "ban",
    description: "Bans a specified user from the guild (Requires Administrator)",
    permissions: ["Administrator"],
    options: [
      {
        type: "User",
        name: "user",
        description: "The user to ban",
        required: true,
      },
    ],
  },
  async (interaction) => {
    const targetUser = interaction.options.getUser("user", true);

    const customIdWithData = createCustomIdWithData("CONFIRM_BAN", targetUser.id);

    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(customIdWithData)
        .setLabel(`Confirm Ban for ${targetUser.username}`)
        .setStyle(ButtonStyle.Danger),
    );

    return await interaction.reply({
      content: `Are you sure you want to ban <@${targetUser.id}>?`,
      components: [button],
      flags: ["Ephemeral"],
    });
  },
);
