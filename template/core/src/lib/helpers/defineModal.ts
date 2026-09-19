import type { ModalSubmitInteraction } from "discord.js";

type ModalInteraction = ModalSubmitInteraction<"cached">;

type ModalConfig = {
  customId: string;
  name: string;
  description: string;
};
type ModalRun = (i: ModalInteraction, sessionId?: string) => unknown | Promise<unknown>;

/**
 * Defines a type-safe modal form submit interaction listener.
 *
 * @param config - The modal configuration containing `customId`, `name`, and `description`
 * @param run - The handler function executed when the modal form is submitted (receives `interaction.fields` and optional `sessionId`)
 * @returns An object containing `config` and `run` exported for the modal component loader
 *
 * @example
 * ```ts
 * export const { config, run } = defineModal(
 *   {
 *     customId: "BUG_REPORT_SUBMIT",
 *     name: "Bug Report Modal Handler",
 *     description: "Processes bug report form submissions",
 *   },
 *   async (interaction, sessionId) => {
 *     const title = interaction.fields.getTextInputValue("BUG_TITLE");
 *     await interaction.reply({ content: `Report received: ${title}`, ephemeral: true });
 *   },
 * );
 * ```
 */
export const defineModal = (config: ModalConfig, run: ModalRun) => ({ config, run });
