import { defineEvent } from "@/lib/helpers/defineEvent";

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
