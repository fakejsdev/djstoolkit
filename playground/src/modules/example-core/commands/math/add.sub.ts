import { defineSubCommand } from "@/lib/helpers/defineSubCommand";

/*
  add.sub.ts — Subcommand example
  Subcommand inside /math group that adds two integer numbers.
*/

export const add = defineSubCommand(
  {
    name: "add",
    description: "Adds two integers together",
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
        description: "Second integer number",
        required: true,
      },
    ],
  },
  async (interaction) => {
    const first = interaction.options.getInteger("first", true);
    const second = interaction.options.getInteger("second", true);
    const sum = first + second;

    return await interaction.reply({
      content: `${first} + ${second} = **${sum}**`,
    });
  },
);
