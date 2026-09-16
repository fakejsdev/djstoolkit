import { defineCommandGroup } from "@/lib/helpers/defineCommandGroup";
import { ban } from "./ban.sub";

export const { config, subCommands } = defineCommandGroup(
  {
    name: "admin",
    description: "Admin Commands",
    permissions: ["Administrator"],
  },
  [ban],
);
