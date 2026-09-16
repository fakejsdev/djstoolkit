import path from "node:path";
import { config } from "@config";
import { client } from "@/lib/discord";
import type { defineModal } from "@/lib/helpers/defineModal";
import { Console } from "@/lib/logger";

type ModalDefinition = ReturnType<typeof defineModal>;

const modals = new Map<string, ModalDefinition>();

const loadModalFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/modals/**/*.modal.ts`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".modal.ts");
    const modal: ModalDefinition = await import(path.resolve(file));

    if (!modal.config || !modal.run)
      throw new Error(`Modal file ${fileName} must export both 'config' and 'run'.`);

    if (!modal.config.customId)
      throw new Error(`Modal file ${fileName} is missing customId (must be unique).`);

    if (modal.config.customId.includes(":"))
      throw new Error(`Modal file ${fileName} customId cannot contain a colon (:).`);

    if (!modal.config.name) throw new Error(`Modal file ${fileName} is missing name.`);

    if (!modal.config.description)
      throw new Error(`Modal file ${fileName} is missing description.`);

    if (modals.has(modal.config.customId))
      throw new Error(
        `Duplicate Unique Modal Custom ID: '${modal.config.customId}' (in ${fileName})`,
      );

    modals.set(modal.config.customId, modal);
  }
};

const attachEventListener = () => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isModalSubmit() || !interaction.inCachedGuild()) return;

    const colonIndex = interaction.customId.indexOf(":");
    const baseId =
      colonIndex !== -1 ? interaction.customId.slice(0, colonIndex) : interaction.customId;
    const sessionId = colonIndex !== -1 ? interaction.customId.slice(colonIndex + 1) : undefined;

    if (!baseId) return;

    const modal = modals.get(baseId);
    if (!modal) return;

    await modal.run(interaction, sessionId);
  });

  Console.Log(`[Components] Registered ${modals.size} modal(s)`);
};

export const initModalsHandler = async () => {
  await loadModalFiles();
  attachEventListener();
};
