import {
  ApplicationCommandOptionType,
  type ChatInputCommandInteraction,
  type SlashCommandSubcommandBuilder,
} from "discord.js";

type SubCommandInteraction = ChatInputCommandInteraction<"cached">;
type SubCommandJSON = ReturnType<SlashCommandSubcommandBuilder["toJSON"]>;

export type SubCommandConfig = Omit<SubCommandJSON, "type">;
export type SubCommandRun = (i: SubCommandInteraction) => unknown | Promise<unknown>;

export const defineSubCommand = (config: SubCommandConfig, run: SubCommandRun) => {
  return {
    config: {
      ...config,
      type: ApplicationCommandOptionType.Subcommand as const,
    },
    run,
  };
};
