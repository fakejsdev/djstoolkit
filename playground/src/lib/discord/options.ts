import type { APIApplicationCommandBasicOption } from "discord.js";
import { ApplicationCommandOptionType } from "discord.js";

export type OptionTypeName = keyof typeof ApplicationCommandOptionType;

export type CommandOption = Omit<APIApplicationCommandBasicOption, "type"> & {
  type: OptionTypeName;
};

export const resolveOptions = (options?: CommandOption[]): APIApplicationCommandBasicOption[] =>
  options?.map(
    (o) =>
      ({ ...o, type: ApplicationCommandOptionType[o.type] }) as APIApplicationCommandBasicOption,
  ) ?? [];
