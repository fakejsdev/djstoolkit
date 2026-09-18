import { defineDbEvent } from "@/lib/helpers/defineDbEvent";
import type { User } from "@/lib/prisma/generated/client";

/*
  defineDbEvent(config, run)
  Registers a Prisma database lifecycle event listener.

  config:
    - on: Typed string literal in format "${Model}.${Operation}" (e.g. "User.create")
    - name: Internal identifier for this DB event handler
    - description: Explains what this event handler does

  run:
    - (args) => unknown | Promise<unknown>
    - Executes automatically whenever Prisma performs the specified operation on the model

  See example below:
*/

export const { config, run } = defineDbEvent(
  {
    on: "User.Upsert",
    name: "User Create Listener",
    description: "Triggers after a new User record is created in the database",
  },
  async (data) => {
    const result = data as User;

    console.log(`[DB Event] New user created in database with ID: ${result.id}`);
  },
);
