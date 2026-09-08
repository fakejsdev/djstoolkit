import { PermissionFlagsBits } from "discord.js";

export type PermissionFlag = keyof typeof PermissionFlagsBits;

export const resolvePermissions = (permissions?: PermissionFlag[]): string | undefined => {
  return permissions
    ?.map((key) => PermissionFlagsBits[key])
    .reduce((acc, p) => acc | p, 0n)
    .toString();
};
