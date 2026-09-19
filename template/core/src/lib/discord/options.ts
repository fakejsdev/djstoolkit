import type { APIApplicationCommandBasicOption } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";

export type OptionTypeName = keyof typeof ApplicationCommandOptionType;

export type CommandOption = Omit<APIApplicationCommandBasicOption, "type"> & {
  type: OptionTypeName;
};

/**
 * Resolves developer-friendly string option types (e.g. `"String"`, `"User"`, `"Integer"`)
 * into Discord API numerical option enums (`ApplicationCommandOptionType`).
 *
 * @param options - Array of user-defined command options with string-literal types
 * @returns Array of resolved API-compatible command options
 */
export const resolveOptions = (options?: CommandOption[]): APIApplicationCommandBasicOption[] =>
  options?.map(
    (o) =>
      ({ ...o, type: ApplicationCommandOptionType[o.type] }) as APIApplicationCommandBasicOption,
  ) ?? [];
