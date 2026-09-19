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

export interface DropdownDefinition {
  config: DropdownConfig;
  run: DropdownRun;
}

/**
 * Defines a type-safe string select menu (dropdown) component interaction listener.
 *
 * @param config - The dropdown configuration containing `customId`, `name`, and `description`
 * @param run - The handler function executed when an option is selected (receives selected values via `interaction.values` and optional `sessionId`)
 * @returns An object containing `config` and `run` exported for the dropdown component loader
 *
 * @example
 * ```ts
 * export const { config, run } = defineDropdown(
 *   {
 *     customId: "INFO_DROPDOWN",
 *     name: "Info Select Menu Handler",
 *     description: "Responds with info based on selected dropdown option",
 *   },
 *   async (interaction, sessionId) => {
 *     const [selectedValue] = interaction.values;
 *     await interaction.reply(`Selected option: ${selectedValue}`);
 *   },
 * );
 * ```
 */
export const defineDropdown = (config: DropdownConfig, run: DropdownRun): DropdownDefinition => ({
  config,
  run,
});
