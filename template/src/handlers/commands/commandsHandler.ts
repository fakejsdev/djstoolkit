import path from "node:path";
import { config } from "@config";
import { isCacheValid, updateCache } from "@/lib/cache";
import { client } from "@/lib/discord";
import type { CommandRun, defineCommand } from "@/lib/helpers/defineCommand";
import type { defineCommandGroup } from "@/lib/helpers/defineCommandGroup";
import type { defineSubCommand, SubCommandRun } from "@/lib/helpers/defineSubCommand";
import { Console } from "@/lib/logger";

type CommandDefinition = ReturnType<typeof defineCommand>;
type CommandGroupDefinition = ReturnType<typeof defineCommandGroup>;
type SubCommandDefinition = ReturnType<typeof defineSubCommand>;

const restCommands = new Map<
  string,
  | CommandDefinition["config"]
  | (CommandGroupDefinition["config"] & { options: SubCommandDefinition["config"][] })
>();
const commands = new Map<string, CommandRun | SubCommandRun>();

const loadCommandFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/commands/**/*.command.{js,ts}`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".command.ts");
    const command: CommandDefinition = await import(path.resolve(file));

    if (!command.config || !command.run)
      throw new Error(`Command file ${fileName} must export both 'config' and 'run'.`);

    if (!command.config.name) throw new Error(`Command file ${fileName} is missing a name.`);

    if (!command.config.description)
      throw new Error(`Command file ${fileName} is missing a description.`);

    if (restCommands.has(command.config.name))
      throw new Error(`Duplicate command name: '${command.config.name}' (in ${fileName})`);

    restCommands.set(command.config.name, command.config);
    commands.set(command.config.name, command.run);
  }
};

const loadCommandGroupFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/commands/**/*.group.{js,ts}`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".group.ts");
    const groupCommand: CommandGroupDefinition = await import(path.resolve(file));

    if (!groupCommand.config || !groupCommand.subCommands)
      throw new Error(
        `Command group file ${fileName} must export both 'config' and 'subCommands'.`,
      );

    if (!groupCommand.config.name)
      throw new Error(`Command group file ${fileName} is missing a name.`);

    if (!groupCommand.config.description)
      throw new Error(`Command group file ${fileName} is missing a description.`);

    if (restCommands.has(groupCommand.config.name))
      throw new Error(`Duplicate command name: '${groupCommand.config.name}' (in ${fileName})`);

    const subMap = new Map<string, SubCommandDefinition>();

    for (const sub of groupCommand.subCommands) {
      if (!sub.config || !sub.run)
        throw new Error(
          `A subcommand in group '${groupCommand.config.name}' (${fileName}) must export 'config' and 'run'.`,
        );
      if (!sub.config.name)
        throw new Error(
          `A subcommand in group '${groupCommand.config.name}' (${fileName}) is missing a name.`,
        );
      if (subMap.has(sub.config.name))
        throw new Error(
          `Duplicate subcommand: '${sub.config.name}' in group '${groupCommand.config.name}' (${fileName})`,
        );

      subMap.set(sub.config.name, sub);
    }

    restCommands.set(groupCommand.config.name, {
      ...groupCommand.config,
      options: Array.from(subMap.values()).map((sub) => sub.config),
    });

    for (const [subName, sub] of subMap) {
      commands.set(`${groupCommand.config.name}.${subName}`, sub.run);
    }
  }
};

const attachInteractionListener = () => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;

    const subCommandName = interaction.options.getSubcommand(false);
    const key = subCommandName
      ? `${interaction.commandName}.${subCommandName}`
      : interaction.commandName;

    const run = commands.get(key);
    if (!run) return;

    await run(interaction);
  });
};

const registerSlashCommands = async () => {
  const commandsData = Array.from(restCommands.values());

  const cachePayload = { commands: commandsData, guildId: process.env.DEV_GUILD_ID ?? null };
  const isValid = await isCacheValid("cmd", cachePayload);

  if (isValid) {
    Console.Log("Commands unchanged, skipping registration.");
    return;
  }

  const target = process.env.DEV_GUILD_ID
    ? client.guilds.cache.get(process.env.DEV_GUILD_ID)
    : client.application;

  await target?.commands.set(commandsData);

  Console.Log(
    process.env.DEV_GUILD_ID
      ? `Registered ${commandsData.length} Command(s) to dev guild ${process.env.DEV_GUILD_ID}`
      : `Registered ${commandsData.length} Command(s) globally`,
  );

  await updateCache("cmd", cachePayload);
};

export const initCommandHandler = async () => {
  await loadCommandFiles();
  await loadCommandGroupFiles();
  attachInteractionListener();
  await registerSlashCommands();
};
