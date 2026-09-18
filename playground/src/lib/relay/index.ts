import { EventEmitter } from "node:events";
import type { RelayRegistry } from "@/lib/relay/events";

const emitter = new EventEmitter();

const send = <K extends keyof RelayRegistry>(event: K, payload: RelayRegistry[K]): void => {
  emitter.emit(event as string, payload);
};

const on = <K extends keyof RelayRegistry>(
  event: K,
  listener: (payload: RelayRegistry[K]) => void,
): void => {
  emitter.on(event as string, listener);
};

const off = <K extends keyof RelayRegistry>(
  event: K,
  listener: (payload: RelayRegistry[K]) => void,
): void => {
  emitter.off(event as string, listener);
};

const once = <K extends keyof RelayRegistry>(
  event: K,
  listener: (payload: RelayRegistry[K]) => void,
): void => {
  emitter.once(event as string, listener);
};

export const relay = {
  send,
  on,
  off,
  once,
};
