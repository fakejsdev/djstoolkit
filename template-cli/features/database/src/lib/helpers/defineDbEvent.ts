import type { DbEventMap } from "@/lib/prisma";

export interface DbEventConfig<T extends keyof DbEventMap = keyof DbEventMap> {
  on: T;
  name: string;
  description: string;
}

export type DbEventRun<T extends keyof DbEventMap> = (
  ...args: DbEventMap[T]
) => unknown | Promise<unknown>;

export const defineDbEvent = <T extends keyof DbEventMap>(
  config: DbEventConfig<T>,
  run: DbEventRun<T>,
) => ({ config, run });
