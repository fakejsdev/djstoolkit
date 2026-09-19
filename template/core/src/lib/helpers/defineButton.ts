import type { ButtonInteraction as DiscordButtonInteraction } from "discord.js";

type ButtonInteraction = DiscordButtonInteraction<"cached">;

export type ButtonConfig = {
  customId: string;
  name: string;
  description: string;
};
export type ButtonRun = (i: ButtonInteraction, sessionId?: string) => unknown | Promise<unknown>;

/**
 * Defines a type-safe button component interaction listener.
 *
 * @param config - The button configuration containing `customId`, `name`, and `description`
 * @param run - The handler function executed when the button is clicked (receives optional `sessionId` via prefix-routing)
 * @returns An object containing `config` and `run` exported for the button component loader
 *
 * @example
 * ```ts
 * export const { config, run } = defineButton(
 *   {
 *     customId: "CONFIRM_BAN",
 *     name: "Confirm Ban Button",
 *     description: "Executes ban confirmation for the target user",
 *   },
 *   async (interaction, targetUserId) => {
 *     await interaction.reply(`Processing ban for user ID: ${targetUserId}`);
 *   },
 * );
 * ```
 */
export const defineButton = (config: ButtonConfig, run: ButtonRun) => ({ config, run });
