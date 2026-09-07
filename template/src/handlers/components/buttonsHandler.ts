import path from "node:path";
import { config } from "@config";
import { client } from "@/lib/discord";
import type { defineButton } from "@/lib/helpers/defineButton";
import { Console } from "@/lib/logger";

type ButtonDefinition = ReturnType<typeof defineButton>;

const buttons = new Map<string, ButtonDefinition>();

const loadCommands = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/buttons/**/*.button.ts`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".button.ts");
    const button: ButtonDefinition = await import(path.resolve(file));

    if (!button.config || !button.run)
      throw new Error(`Button file ${fileName} must export both 'config' and 'run'.`);

    if (!button.config.customId)
      throw new Error(`Button file ${fileName} is missing customId (must be unique).`);

    if (!button.config.name) throw new Error(`Button file ${fileName} is missing name.`);

    if (!button.config.description)
      throw new Error(`Button file ${fileName} is missing description.`);

    if (buttons.has(button.config.customId))
      throw new Error(
        `Duplicate Unique Button Custom ID: '${button.config.customId}' (in ${fileName})`,
      );

    buttons.set(button.config.customId, button);
  }
};

const attachEventListener = () => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isButton() || !interaction.inCachedGuild()) return;

    const button = buttons.get(interaction.customId);
    if (!button) return;

    await button.run(interaction);
  });
  Console.Log(`[Components] Registered ${buttons.size} button(s)`);
};

export const initButtonHandler = async () => {
  await loadCommands();
  attachEventListener();
};
