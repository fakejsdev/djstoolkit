import type { SlashCommandBuilder } from "discord.js";
import { type PermissionFlag, resolvePermissions } from "@/lib/discord/permissions";
import type { defineSubCommand } from "./defineSubCommand";

type CommandGroupJSON = ReturnType<SlashCommandBuilder["toJSON"]>;

export interface CommandGroupConfig extends Omit<CommandGroupJSON, "default_member_permissions"> {
  permissions?: PermissionFlag[];
}

export type CommandGroupSubCommands = Array<ReturnType<typeof defineSubCommand>>;

export const defineCommandGroup = (
  config: CommandGroupConfig,
  subCommands: CommandGroupSubCommands,
) => {
  const { permissions, ...rest } = config;

  return {
    config: {
      ...rest,
      default_member_permissions: resolvePermissions(permissions),
    },
    subCommands,
  };
};
