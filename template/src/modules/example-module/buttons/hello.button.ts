import { defineButton } from "@/lib/helpers/defineButton";

export const { config, run } = defineButton(
  {
    customId: "HELLO_BUTTON",
    name: "Hello Button",
    description: "Some Hello Button",
  },
  async (interaction) => await interaction.reply("Hello!"),
);
