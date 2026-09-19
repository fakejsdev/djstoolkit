import {
  ApplicationCommandOptionType,
  type ChatInputCommandInteraction,
  type SlashCommandSubcommandBuilder,
} from "discord.js";
import { type CommandOption, resolveOptions } from "@/lib/discord/options";

type SubCommandInteraction = ChatInputCommandInteraction<"cached">;
type SubCommandJSON = ReturnType<SlashCommandSubcommandBuilder["toJSON"]>;

export interface SubCommandConfig extends Omit<SubCommandJSON, "type" | "options"> {
  options?: CommandOption[];
}
export type SubCommandRun = (i: SubCommandInteraction) => unknown | Promise<unknown>;

/**
 * Defines a type-safe subcommand intended to be included inside a `defineCommandGroup`.
 *
 * @param config - The subcommand configuration (name, description, options)
 * @param run - The handler function executed when the subcommand is invoked in Discord
 * @returns An object containing resolved `config` and `run` for inclusion in a command group
 *
 * @example
 * ```ts
 * export const add = defineSubCommand(
 *   {
 *     name: "add",
 *     description: "Adds two integers together",
 *     options: [
 *       {
 *         type: "Integer",
 *         name: "first",
 *         description: "First integer number",
 *         required: true,
 *       },
 *     ],
 *   },
 *   async (interaction) => {
 *     const first = interaction.options.getInteger("first", true);
 *     await interaction.reply(`Value: ${first}`);
 *   },
 * );
 * ```
 */
export const defineSubCommand = (config: SubCommandConfig, run: SubCommandRun) => {
  const { options, ...rest } = config;

  return {
    config: {
      ...rest,
      type: ApplicationCommandOptionType.Subcommand as const,
      options: resolveOptions(options),
    },
    run,
  };
};
