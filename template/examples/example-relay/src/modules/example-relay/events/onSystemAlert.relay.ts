import { defineRelay } from "@/lib/helpers/defineRelay";

/*
  defineRelay(config, run)
  Registers an internal Relay Pub/Sub event listener.

  config:
    - on: Event name registered in RelayRegistry (e.g. "system:announcement")
    - name: Internal identifier for this relay listener
    - description: Explains what this relay listener does

  run:
    - (payload) => unknown | Promise<unknown>
    - payload: Fully typed payload based on RelayRegistry["system:announcement"]

  See example below:
*/

export const { config, run } = defineRelay(
  {
    on: "system:announcement",
    name: "System Announcement Listener",
    description: "Logs and processes internal system announcements emitted via Relay",
  },
  async (payload) => {
    const { title, message, author } = payload;

    console.log(`[RELAY ANNOUNCEMENT] "${title}" by ${author}: ${message}`);
  },
);
