import { defineCommandGroup } from "@/lib/helpers/defineCommandGroup";
import { add } from "./add.sub";
import { subtract } from "./subtract.sub";

export const { config, subCommands } = defineCommandGroup(
  {
    name: "math",
    description: "Just the math",
  },
  [add, subtract],
);
