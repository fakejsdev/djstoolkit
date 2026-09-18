import { defineButton } from "@/lib/helpers/defineButton";

/*
  refresh.button.ts — Button component handler example
  Handles REFRESH_PING customId and sends an ephemeral message with fresh latency.
*/

export const { config, run } = defineButton(
  {
    customId: "REFRESH_PING",
    name: "Refresh Ping Button",
    description: "Replies with current websocket ping latency",
  },
  async (interaction) => {
    return await interaction.reply({
      content: `Current WebSocket Latency: \`${interaction.client.ws.ping}ms\``,
      flags: ["Ephemeral"],
    });
  },
);
