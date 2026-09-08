import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { defineCommand } from "@/lib/helpers/defineCommand";

export const { config, run } = defineCommand(
  {
    name: "ping",
    description: "hello",
    permissions: ["Administrator"],
  },
  async (interaction) => {
    const button = new ButtonBuilder()
      .setCustomId("HELLO_BUTTON")
      .setLabel("hello")
      .setStyle(ButtonStyle.Primary);

    return await interaction.reply({
      content: "Hello, click the button below",
      components: [new ActionRowBuilder<ButtonBuilder>().addComponents(button)],
    });
  },
);
