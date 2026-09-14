import { ApplicationCommandOptionType } from "discord.js";
import { defineSubCommand } from "@/lib/helpers/defineSubCommand";

/*
  defineSubCommand — registers a subcommand, must be added to a command group via defineCommandGroup
  name        — subcommand name shown in Discord
  description — short description shown in Discord
  options     — command arguments; use ApplicationCommandOptionType to declare the type of each
*/

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
