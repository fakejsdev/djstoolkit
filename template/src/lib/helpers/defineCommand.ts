import type { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

type CommandInteraction = ChatInputCommandInteraction<"cached">;

export type CommandConfig = ReturnType<SlashCommandBuilder["toJSON"]>;
export type CommandRun = (i: CommandInteraction) => unknown | Promise<unknown>;

export const defineCommand = (config: CommandConfig, run: CommandRun) => ({
  config,
  run,
});
