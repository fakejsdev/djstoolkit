import type { SlashCommandBuilder } from "discord.js";
import { type PermissionFlag, resolvePermissions } from "@/lib/discord/permissions";
import type { defineSubCommand } from "./defineSubCommand";

type CommandGroupJSON = ReturnType<SlashCommandBuilder["toJSON"]>;

export interface CommandGroupConfig extends Omit<CommandGroupJSON, "default_member_permissions"> {
  permissions?: PermissionFlag[];
}

export type CommandGroupSubCommands = Array<ReturnType<typeof defineSubCommand>>;

/**
 * Defines a slash command group aggregating multiple subcommands under a parent command (e.g. `/math add`).
 *
 * @param config - The command group configuration (name, description, permissions)
 * @param subCommands - Array of subcommands defined via `defineSubCommand`
 * @returns An object containing `config` and `subCommands` exported for the command group loader
 *
 * @example
 * ```ts
 * export const { config, subCommands } = defineCommandGroup(
 *   {
 *     name: "math",
 *     description: "Command group for basic math operations",
 *   },
 *   [add, subtract],
 * );
 * ```
 */
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
