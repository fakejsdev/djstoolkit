import path from "node:path";
import { config } from "@config";
import { client } from "@/lib/discord";
import type { CommandConfig, CommandRun } from "@/lib/helpers/defineCommand";
import { Console } from "@/lib/logger";

type CommandDefinition = {
  config: CommandConfig;
  run: CommandRun;
};

const commands = new Map<string, CommandDefinition>();

const loadCommandFiles = async () => {
  const glob = new Bun.Glob(`${config.modulesDir}/*/commands/*.command.{js,ts}`);

  for await (const file of glob.scan(".")) {
    const fileName = path.basename(file, ".command.ts");
    const command: CommandDefinition = await import(path.resolve(file));

    if (!command.config || !command.run)
      throw new Error(`Command file ${fileName} must export both 'config' and 'run'.`);

    if (!command.config.name)
      throw new Error(
        `Command file ${fileName} is missing a name — add .setName('...') to the builder.`,
      );

    if (!command.config.description)
      throw new Error(
        `Command file ${fileName} is missing a description — add .setDescription('...') to the builder.`,
      );

    if (commands.has(command.config.name))
      throw new Error(`Duplicate command name: '${command.config.name}' (in ${fileName})`);

    commands.set(command.config.name, command);
  }
};

const attachInteractionListener = () => {
  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand() || !interaction.inCachedGuild()) return;

    const command = commands.get(interaction.commandName);
    if (!command) return;

    await command.run(interaction);
  });
};

const registerSlashCommands = async () => {
  const commandsData = Array.from(commands.values()).map((command) => command.config);

  if (process.env.DEV_GUILD_ID) {
    const guild = client.guilds.cache.get(process.env.DEV_GUILD_ID);
    await guild?.commands.set(commandsData);
    Console.Log(
      `Registered ${commandsData.length} command(s) to dev guild ${process.env.DEV_GUILD_ID}`,
    );
    return;
  }

  await client.application?.commands.set(commandsData);
  Console.Log(`Registered ${commandsData.length} command(s) globally`);
};

export const initCommandHandler = async () => {
  await loadCommandFiles();
  attachInteractionListener();
  await registerSlashCommands();
};
