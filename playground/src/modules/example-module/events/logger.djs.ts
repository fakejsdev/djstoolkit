import { defineEvent } from "@/lib/helpers/defineEvent";

/*
  defineEvent — registers a Discord client event handler
  on          — event name from ClientEvents (fully typed)
  name        — short label describing the handler's purpose
  description — what the handler does
  once        — optional, fires only once if true (defaults to false)
*/

export const { config, run } = defineEvent(
  {
    on: "messageCreate",
    name: "Message Logger",
    description: "Logs any message",
  },
  (message) => {
    if (message.author.bot) return;

    console.log(`User ${message.author.username} said ${message.content}`);
  },
);
