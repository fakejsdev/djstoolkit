import type { ModalSubmitInteraction } from "discord.js";

type ModalInteraction = ModalSubmitInteraction<"cached">;

type ModalConfig = {
  customId: string;
  name: string;
  description: string;
};
type ModalRun = (i: ModalInteraction) => unknown | Promise<unknown>;

export const defineModal = (config: ModalConfig, run: ModalRun) => ({ config, run });
