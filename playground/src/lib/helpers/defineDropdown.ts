import type { StringSelectMenuInteraction } from "discord.js";

export type DropdownInteraction = StringSelectMenuInteraction<"cached">;

export type DropdownConfig = {
  customId: string;
  name: string;
  description: string;
};
export type DropdownRun = (
  i: DropdownInteraction,
  sessionId?: string,
) => unknown | Promise<unknown>;

export const defineDropdown = (config: DropdownConfig, run: DropdownRun) => ({ config, run });
