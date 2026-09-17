import { defineSubCommand } from "@/lib/helpers/defineSubCommand";

/*
  subtract.sub.ts — Subcommand example
  Subcommand inside /math group that subtracts the second integer from the first.
*/

export const subtract = defineSubCommand(
  {
    name: "subtract",
    description: "Subtracts second integer from first integer",
    options: [
      {
        type: "Integer",
        name: "first",
        description: "First integer number",
        required: true,
      },
      {
        type: "Integer",
        name: "second",
        description: "Second integer number to subtract",
        required: true,
      },
    ],
  },
  async (interaction) => {
    const first = interaction.options.getInteger("first", true);
    const second = interaction.options.getInteger("second", true);
    const result = first - second;

    return await interaction.reply({
      content: `${first} - ${second} = **${result}**`,
    });
  },
);
