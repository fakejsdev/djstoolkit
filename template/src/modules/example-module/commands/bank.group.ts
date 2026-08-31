import { defineCommandGroup } from "@/lib/helpers/defineCommandGroup";
import { bankWithdraw } from "./withdraw.sub.ts";

export const { config, subCommands } = defineCommandGroup(
  {
    name: "bank",
    description: "Manage Bank",
  },
  [bankWithdraw],
);
