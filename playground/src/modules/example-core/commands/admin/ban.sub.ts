import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { defineSubCommand } from "@/lib/helpers/defineSubCommand";
import { createCustomIdWithData } from "@/lib/helpers/session";
import { BUTTONS } from "../../types";

export const ban = defineSubCommand(
  {
    name: "ban",
    description: "Ban User!",
    options: [
      {
        type: "User",
        name: "user",
        description: "Pick a user to ban!",
        required: true,
      },
    ],
  },
  async (interaction) => {
    const user = interaction.options.getUser("user", true);

    const buttonIdWithData = createCustomIdWithData(BUTTONS.CONFIRM_BAN, user.id);

    const button = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(buttonIdWithData)
        .setLabel("Confirm Ban")
        .setStyle(ButtonStyle.Danger),
    );

    return await interaction.reply({
      content: `Confirm to ban the <@${user.id}>`,
      components: [button],
      flags: ["Ephemeral"],
    });
  },
);
