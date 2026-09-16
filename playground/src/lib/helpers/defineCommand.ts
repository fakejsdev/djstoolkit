import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { type CommandOption, resolveOptions } from "@/lib/discord/options";
import { type PermissionFlag, resolvePermissions } from "@/lib/discord/permissions";

type CommandInteraction = ChatInputCommandInteraction<"cached">;
type CommandJSON = ReturnType<SlashCommandBuilder["toJSON"]>;

export interface CommandConfig extends Omit<CommandJSON, "default_member_permissions" | "options"> {
  permissions?: PermissionFlag[];
  options?: CommandOption[];
}
export type CommandRun = (i: CommandInteraction) => unknown | Promise<unknown>;

export const defineCommand = (config: CommandConfig, run: CommandRun) => {
  const { permissions, options, ...rest } = config;

  return {
    config: {
      ...rest,
      options: resolveOptions(options),
      default_member_permissions: resolvePermissions(permissions),
    },
    run,
  };
};
