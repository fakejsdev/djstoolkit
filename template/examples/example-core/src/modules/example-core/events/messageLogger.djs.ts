import { defineEvent } from "@/lib/helpers/defineEvent";

/*
  defineEvent(config, run)
  Registers a Discord client event listener.

  config:
    - on: Event name from Discord.js ClientEvents (fully typed)
    - name: Internal identifier for this event handler
    - description: Explains what this event handler does

  run:
    - (...args: ClientEvents[on]) => unknown | Promise<unknown>

  See example below:
*/

export const { config, run } = defineEvent(
  {
    on: "messageCreate",
    name: "Message Logger Event",
    description: "Logs messages sent in server text channels",
  },
  async (message) => {
    // Ignore bot messages to prevent infinite loops
    if (message.author.bot) return;

    console.log(`[MessageLogger] ${message.author.tag}: ${message.content}`);
  },
);
