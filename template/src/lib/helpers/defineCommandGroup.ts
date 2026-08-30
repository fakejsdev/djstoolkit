import type { SlashCommandBuilder } from "discord.js";
import { type PermissionFlag, resolvePermissions } from "@/lib/discord/permissions";
import type { SubCommandConfig, SubCommandRun } from "./defineSubCommand";

type CommandGroupJSON = ReturnType<SlashCommandBuilder["toJSON"]>;

export interface CommandGroupConfig
  extends Omit<CommandGroupJSON, "default_member_permissions" | "options"> {
  permissions?: PermissionFlag[];
  subCommands: Array<{ config: SubCommandConfig; run: SubCommandRun }>;
}

export const defineCommandGroup = (config: CommandGroupConfig) => {
  const { permissions, ...rest } = config;

  return {
    config: {
      ...rest,
      default_member_permissions: resolvePermissions(permissions),
    },
  };
};
