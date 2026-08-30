import type { ChatInputCommandInteraction, SlashCommandSubcommandBuilder } from "discord.js";

type SubCommandInteraction = ChatInputCommandInteraction<"cached">;

export type SubCommandConfig = ReturnType<SlashCommandSubcommandBuilder["toJSON"]>;
export type SubCommandRun = (i: SubCommandInteraction) => unknown | Promise<unknown>;

export const defineSubCommand = async (config: SubCommandConfig, run: SubCommandRun) => ({
  config,
  run,
});
