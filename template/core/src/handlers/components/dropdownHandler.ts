import path from "node:path";
import { config } from "@config";
import { client } from "@/lib/discord";
import type { defineDropdown } from "@/lib/helpers/defineDropdown";
import { Console } from "@/lib/logger";

type DropdownDefinition = ReturnType<typeof defineDropdown>;

const dropdowns = new Map<string, DropdownDefinition>();

const loadDropdownFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/dropdowns/**/*.dropdown.ts`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".dropdown.ts");
    const dropdown: DropdownDefinition = await import(path.resolve(file));

    if (!dropdown.config || !dropdown.run)
      throw new Error(`Dropdown file ${fileName} must export both 'config' and 'run'.`);

    if (!dropdown.config.customId)
      throw new Error(`Dropdown file ${fileName} is missing customId (must be unique).`);

    if (!dropdown.config.name) throw new Error(`Dropdown file ${fileName} is missing name.`);

    if (!dropdown.config.description)
      throw new Error(`Dropdown file ${fileName} is missing description.`);

    if (dropdowns.has(dropdown.config.customId))
      throw new Error(
        `Duplicate Unique Dropdown Custom ID: '${dropdown.config.customId}' (in ${fileName})`,
      );

    dropdowns.set(dropdown.config.customId, dropdown);
  }
};

const attachEventListener = () => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isStringSelectMenu() || !interaction.inCachedGuild()) return;

    const dropdown = dropdowns.get(interaction.customId);
    if (!dropdown) return;

    await dropdown.run(interaction);
  });
  Console.Log(`[Components] Registered ${dropdowns.size} dropdown(s)`);
};

export const initDropdownHandler = async () => {
  await loadDropdownFiles();
  attachEventListener();
};
