import { defineCommandGroup } from "@/lib/helpers/defineCommandGroup";
import { addXp } from "./add.sub";
import { removeXp } from "./remove.sub";

export const { config, subCommands } = defineCommandGroup(
  {
    name: "xp",
    description: "Manage users XP and Levels",
    permissions: ["Administrator"],
  },
  [addXp, removeXp],
);
