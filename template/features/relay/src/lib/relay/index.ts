import { EventEmitter } from "node:events";
import type { RelayRegistry } from "@/lib/relay/events";

const emitter = new EventEmitter();

/**
 * Emits a type-safe internal Pub/Sub event to all subscribed Relay listeners.
 *
 * @template K - The registered event name from `RelayRegistry`
 * @param event - The name of the internal event to emit
 * @param payload - The required data payload for the specified event
 *
 * @example
 * ```ts
 * relay.send("system:announcement", {
 *   title: "Maintenance",
 *   message: "Server restart in 5 minutes",
 *   author: "Admin",
 * });
 * ```
 */
const send = <K extends keyof RelayRegistry>(event: K, payload: RelayRegistry[K]): void => {
  emitter.emit(event as string, payload);
};

/**
 * Subscribes a persistent listener function to an internal Relay event.
 *
 * @template K - The registered event name from `RelayRegistry`
 * @param event - The name of the internal event to listen for
 * @param listener - Callback function executed whenever the event is emitted
 *
 * @example
 * ```ts
 * relay.on("system:announcement", (payload) => {
 *   console.log(`[Announcement] ${payload.title}: ${payload.message}`);
 * });
 * ```
 */
const on = <K extends keyof RelayRegistry>(
  event: K,
  listener: (payload: RelayRegistry[K]) => void,
): void => {
  emitter.on(event as string, listener);
};

/**
 * Removes a previously registered listener function from an internal Relay event.
 *
 * @template K - The registered event name from `RelayRegistry`
 * @param event - The name of the internal event
 * @param listener - The exact callback function instance to remove
 */
const off = <K extends keyof RelayRegistry>(
  event: K,
  listener: (payload: RelayRegistry[K]) => void,
): void => {
  emitter.off(event as string, listener);
};

/**
 * Subscribes a one-time listener function to an internal Relay event.
 * Automatically unsubscribes after the event is triggered for the first time.
 *
 * @template K - The registered event name from `RelayRegistry`
 * @param event - The name of the internal event
 * @param listener - Callback function executed once when the event is emitted
 */
const once = <K extends keyof RelayRegistry>(
  event: K,
  listener: (payload: RelayRegistry[K]) => void,
): void => {
  emitter.once(event as string, listener);
};

/**
 * Type-safe internal Pub/Sub event bus for decoupling modules across the application.
 */
export const relay = {
  send,
  on,
  off,
  once,
};
