import type { DbEventMap } from "@/lib/prisma";

export interface DbEventConfig<T extends keyof DbEventMap = keyof DbEventMap> {
  on: T;
  name: string;
  description: string;
}
export type DbEventRun<T extends keyof DbEventMap> = (
  ...args: DbEventMap[T]
) => unknown | Promise<unknown>;

export interface DbEventDefinition<T extends keyof DbEventMap = keyof DbEventMap> {
  config: DbEventConfig<T>;
  run: DbEventRun<T>;
}

/**
 * Defines a type-safe Prisma database event listener.
 *
 * @template T - The Prisma event name from `DbEventMap` (e.g. `"User.Create"`, `"User.Update"`)
 * @param config - The database event configuration containing `on`, `name`, and `description`
 * @param run - The handler function executed when the specified Prisma operation completes
 * @returns An object containing `config` and `run` exported for the database event loader
 *
 * @example
 * ```ts
 * export const { config, run } = defineDbEvent(
 *   {
 *     on: "User.Create",
 *     name: "User Create Listener",
 *     description: "Triggers after a User record is created in the database",
 *   },
 *   async (user) => {
 *     console.log("User created in DB:", user.id);
 *   },
 * );
 * ```
 */
export const defineDbEvent = <T extends keyof DbEventMap>(
  config: DbEventConfig<T>,
  run: DbEventRun<T>,
): DbEventDefinition<T> => ({ config, run });
