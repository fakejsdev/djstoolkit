import { defineCommandGroup } from "@/lib/helpers/defineCommandGroup";
import { add } from "./add.sub";
import { subtract } from "./subtract.sub";

/*
  math.group.ts — Command Group example
  Groups subcommands under a common parent command (e.g. /math add, /math subtract).
*/

export const { config, subCommands } = defineCommandGroup(
  {
    name: "math",
    description: "Command group for basic math operations",
  },
  [add, subtract],
);
