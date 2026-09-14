import { defineCommandGroup } from "@/lib/helpers/defineCommandGroup";
import { add } from "./add.sub";
import { subtract } from "./subtract.sub";

/*
  defineCommandGroup — registers a slash command group with subcommands
  name        — group name used to invoke the command (e.g. /math add)
  description — short description shown in Discord
  subCommands — array of subcommands defined with defineSubCommand
*/

export const { config, subCommands } = defineCommandGroup(
  {
    name: "math",
    description: "Basic math operations",
  },
  [add, subtract],
);
