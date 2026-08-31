import { defineEvent } from "@/lib/helpers/defineEvents";
import { Console } from "@/lib/logger";

export const { config, run } = defineEvent(
  {
    on: "messageCreate",
    name: "messageLogger",
    description: "Logs messages",
  },
  (message) => {
    Console.Log(`User: ${message.author.tag} said ${message.content}`);
  },
);
