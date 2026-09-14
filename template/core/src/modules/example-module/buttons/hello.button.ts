import { defineButton } from "@/lib/helpers/defineButton";

export const { config, run } = defineButton(
  {
    customId: "HELLO_BUTTON",
    name: "Just hellos",
    description: "Thats the hello button",
  },
  async (interaction) => await interaction.reply("Hello!"),
);
