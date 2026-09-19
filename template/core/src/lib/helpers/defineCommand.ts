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

/**
 * Defines a type-safe Discord slash command with automatic option & permission resolution.
 *
 * @param config - The command configuration (name, description, options, permissions)
 * @param run - The handler function executed when the slash command is invoked in Discord
 * @returns An object containing resolved `config` and `run` exported for the command loader
 *
 * @example
 * ```ts
 * export const { config, run } = defineCommand(
 *   {
 *     name: "ping",
 *     description: "Check bot latency and websocket status",
 *     permissions: ["Administrator"],
 *   },
 *   async (interaction) => {
 *     await interaction.reply(`Pong! Latency: ${interaction.client.ws.ping}ms`);
 *   },
 * );
 * ```
 */
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
