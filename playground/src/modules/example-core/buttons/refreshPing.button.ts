import { defineButton } from "@/lib/helpers/defineButton";
import { BUTTONS } from "../types";

export const { config, run } = defineButton(
  {
    customId: BUTTONS.REFRESH_PING,
    name: "Refresh Ping",
    description: "Sends new empheral message to channel with current ws ping",
  },
  async (interaction) => {
    return await interaction.reply({
      content: `Current ping is ${interaction.client.ws.ping}ms`,
      flags: ["Ephemeral"],
    });
  },
);
