import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import { type PermissionFlag, resolvePermissions } from "@/lib/discord/permissions";

type CommandInteraction = ChatInputCommandInteraction<"cached">;
type CommandJSON = ReturnType<SlashCommandBuilder["toJSON"]>;

export interface CommandConfig extends Omit<CommandJSON, "default_member_permissions"> {
  permissions?: PermissionFlag[];
}
export type CommandRun = (i: CommandInteraction) => unknown | Promise<unknown>;

export const defineCommand = (config: CommandConfig, run: CommandRun) => {
  const { permissions, ...rest } = config;

  return {
    config: {
      ...rest,
      default_member_permissions: resolvePermissions(permissions),
    },
    run,
  };
};
