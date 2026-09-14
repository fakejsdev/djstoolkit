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
