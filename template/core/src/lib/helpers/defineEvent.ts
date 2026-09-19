import type { ClientEvents } from "discord.js";

export interface EventConfig<T extends keyof ClientEvents = keyof ClientEvents> {
  on: T;
  name: string;
  description: string;
  once?: boolean;
}

export type EventRun<T extends keyof ClientEvents> = (
  ...ars: ClientEvents[T]
) => unknown | Promise<unknown>;

/**
 * Defines a type-safe Discord client event listener (e.g. `messageCreate`, `clientReady`).
 *
 * @template T - The event name from Discord.js `ClientEvents`
 * @param config - The event configuration (`on`, `name`, `description`, optional `once`)
 * @param run - The handler function executed when the Discord client event is emitted (parameters are automatically typed)
 * @returns An object containing `config` and `run` exported for the Discord event loader
 *
 * @example
 * ```ts
 * export const { config, run } = defineEvent(
 *   {
 *     on: "messageCreate",
 *     name: "Message Logger",
 *     description: "Logs incoming messages sent in text channels",
 *   },
 *   async (message) => {
 *     if (message.author.bot) return;
 *     console.log(`${message.author.tag}: ${message.content}`);
 *   },
 * );
 * ```
 */
export const defineEvent = <T extends keyof ClientEvents>(
  config: EventConfig<T>,
  run: EventRun<T>,
) => ({ config, run });
