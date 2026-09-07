import type { ButtonInteraction as DiscordButtonInteraction } from "discord.js";

type ButtonInteraction = DiscordButtonInteraction<"cached">;

export type ButtonConfig = {
  id: string;
  name: string;
  description: string;
};

export type ButtonRun = (i: ButtonInteraction) => unknown | Promise<unknown>;

export const defineButton = (config: ButtonConfig, run: ButtonRun) => ({ config, run });
