import { defineCommand } from "@/lib/helpers/defineCommand";

export const { config, run } = defineCommand(
  {
    name: "ping",
    description: "hello",
    permissions: ["Administrator"],
  },
  async (interaction) => {
    await interaction.reply("Pong!");
  },
);
