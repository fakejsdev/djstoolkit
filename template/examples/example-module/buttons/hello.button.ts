import { defineButton } from "@/lib/helpers/defineButton";

/*
  defineButton — registers a button interaction handler
  customId    — must be unique across the entire project
  name        — short label describing the button's purpose
  description — what the button does

  run can return unknown | Promise<unknown> — async/await is optional
*/

export const { config, run } = defineButton(
  {
    customId: "HELLO_BUTTON",
    name: "Just hellos",
    description: "Thats the hello button",
  },
  async (interaction) => await interaction.reply("Hello!"),
);
