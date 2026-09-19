import { PermissionFlagsBits } from "discord.js";

export type PermissionFlag = keyof typeof PermissionFlagsBits;

/**
 * Resolves an array of typed permission strings (e.g. `["Administrator", "BanMembers"]`)
 * into a combined bitfield string required by the Discord REST API for command registration.
 *
 * @param permissions - Array of typed permission string flags
 * @returns Combined permission bitfield string, or `undefined` if no permissions were provided
 */
export const resolvePermissions = (permissions?: PermissionFlag[]): string | undefined => {
  return permissions
    ?.map((key) => PermissionFlagsBits[key])
    .reduce((acc, p) => acc | p, 0n)
    .toString();
};
