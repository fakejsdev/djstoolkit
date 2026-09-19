import type { RelayRegistry } from "@/lib/relay/events";

export interface RelayConfig<K extends keyof RelayRegistry> {
  on: K;
  name: string;
  description: string;
}
export type RelayRun<K extends keyof RelayRegistry> = (
  payload: RelayRegistry[K],
) => unknown | Promise<unknown>;

export interface RelayDefinition<K extends keyof RelayRegistry = keyof RelayRegistry> {
  config: RelayConfig<K>;
  run: RelayRun<K>;
}

/**
 * Defines a type-safe internal Pub/Sub event listener for the Relay system.
 *
 * @template K - The registered internal event name from `RelayRegistry` (e.g. `"system:announcement"`)
 * @param config - The relay listener configuration containing `on`, `name`, and `description`
 * @param run - The handler function executed when the specified event is emitted via `relay.send()`
 * @returns An object containing `config` and `run` exported for the relay event loader
 *
 * @example
 * ```ts
 * export const { config, run } = defineRelay(
 *   {
 *     on: "system:announcement",
 *     name: "System Announcement Listener",
 *     description: "Logs internal system announcements emitted via Relay",
 *   },
 *   async (payload) => {
 *     console.log(`[Relay] Announcement "${payload.title}" by ${payload.author}`);
 *   },
 * );
 * ```
 */
export const defineRelay = <K extends keyof RelayRegistry>(
  config: RelayConfig<K>,
  run: RelayRun<K>,
): RelayDefinition<K> => ({ config, run });
