const CACHE_DIR = ".djs";

/**
 * Checks whether the stored disk cache hash matches the hash of current data payload.
 * Used internally to prevent unnecessary Discord API calls (e.g. slash command re-registration).
 *
 * @param key - Cache key identifier (e.g. `"cmd"`)
 * @param data - Current data payload to hash and compare
 * @returns `true` if data is unchanged and cache is valid, `false` otherwise
 */
export const isCacheValid = async (key: string, data: unknown): Promise<boolean> => {
  const file = Bun.file(`${CACHE_DIR}/.${key}.cache`);
  const exists = await file.exists();

  if (!exists) return false;

  const currentHash = Bun.hash(JSON.stringify(data)).toString(16);
  const prevHash = await file.text();

  return currentHash === prevHash;
};

/**
 * Updates the local cache file on disk with the new hash of the provided data payload.
 *
 * @param key - Cache key identifier (e.g. `"cmd"`)
 * @param data - Data payload to hash and persist to disk
 */
export const updateCache = async (key: string, data: unknown): Promise<void> => {
  const currentHash = Bun.hash(JSON.stringify(data)).toString(16);
  await Bun.write(`${CACHE_DIR}/.${key}.cache`, currentHash);
};
