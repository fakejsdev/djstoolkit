import { ApplicationCommandOptionType } from "discord.js";
import { defineSubCommand } from "@/lib/helpers/defineSubCommand";

export const add = defineSubCommand(
  {
    name: "add",
    description: "Adds two integers",
    options: [
      {
        type: ApplicationCommandOptionType.Integer,
        name: "value1",
        description: "First integer",
        required: true,
      },
      {
        type: ApplicationCommandOptionType.Integer,
        name: "value2",
        description: "Second integer",
        required: true,
      },
    ],
  },
  async (interaction) => {
    const value1 = interaction.options.getInteger("value1", true);
    const value2 = interaction.options.getInteger("value2", true);

    const res = (value1 + value2).toFixed(2);

    return await interaction.reply(`${value1}+${value2}=${res}`);
  },
);
