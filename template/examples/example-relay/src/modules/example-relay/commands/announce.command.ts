import { defineCommand } from "@/lib/helpers/defineCommand";
import { relay } from "@/lib/relay";

/*
  defineCommand(config, run)
  For full command docs, see example-core/commands/basic.command.ts

  announce.command.ts — Relay feature live example
  Demonstrates emitting an internal Pub/Sub event via relay.send().

  See example below:
*/

export const { config, run } = defineCommand(
  {
    name: "announce",
    description: "Broadcasts an internal system announcement via Relay Pub/Sub",
    options: [
      {
        type: "String",
        name: "title",
        description: "Announcement title",
        required: true,
      },
      {
        type: "String",
        name: "message",
        description: "Announcement details",
        required: true,
      },
    ],
  },
  async (interaction) => {
    const title = interaction.options.getString("title", true);
    const message = interaction.options.getString("message", true);

    relay.send("system:announcement", {
      title,
      message,
      author: interaction.user.tag,
    });

    return await interaction.reply({
      content: `📢 Announcement **"${title}"** dispatched to internal Relay event bus!`,
      flags: ["Ephemeral"],
    });
  },
);
