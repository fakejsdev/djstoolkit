import type { RelayRegistry } from "../relay/events";

export interface RelayConfig<K extends keyof RelayRegistry> {
  on: K;
  name: string;
  description: string;
}

export type RelayRun<K extends keyof RelayRegistry> = (
  payload: RelayRegistry[K],
) => unknown | Promise<unknown>;

export const defineRelay = <K extends keyof RelayRegistry>(
  config: RelayConfig<K>,
  run: RelayRun<K>,
) => ({ config, run });
