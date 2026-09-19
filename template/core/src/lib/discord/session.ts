/**
 * Creates a prefix-routed component `customId` with an automatically generated UUID session token.
 *
 * @param baseId - The base handler ID (must not contain colons)
 * @returns Formatted customId string in `"BASE_ID:uuid"` format
 * @throws Error if `baseId` contains a colon (`:`)
 *
 * @example
 * ```ts
 * const customId = createSessionId("CONFIRM_MODAL");
 * // Result: "CONFIRM_MODAL:f47ac10b-58cc-4372-a567-0e02b2c3d479"
 * ```
 */
export const createSessionId = (baseId: string): string => {
  if (baseId.includes(":")) throw new Error(`Base ID '${baseId}' cannot contain a colon (:).`);
  return `${baseId}:${crypto.randomUUID()}`;
};

/**
 * Creates a prefix-routed component `customId` with custom data attached.
 *
 * @param baseId - The base handler ID (must not contain colons)
 * @param data - The string data payload to attach (e.g. User ID, Item ID)
 * @returns Formatted customId string in `"BASE_ID:data"` format
 * @throws Error if `baseId` contains a colon (`:`)
 *
 * @example
 * ```ts
 * const customId = createCustomIdWithData("CONFIRM_BAN", interaction.user.id);
 * // Result: "CONFIRM_BAN:123456789012345678"
 * ```
 */
export const createCustomIdWithData = (baseId: string, data: string): string => {
  if (baseId.includes(":")) throw new Error(`Base ID '${baseId}' cannot contain a colon (:).`);
  return `${baseId}:${data}`;
};
