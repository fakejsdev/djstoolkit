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

export const defineEvent = <T extends keyof ClientEvents>(
  config: EventConfig<T>,
  run: EventRun<T>,
) => ({ config, run });
