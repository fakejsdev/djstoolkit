type StoreEntry<T = unknown> = {
  data: T;
  eat: number; // expiresAt timestamp
};

const store = new Map<string, StoreEntry>();
const DEFAULT_TTL = 15 * 60 * 1000; // 15 minutes

/**
 * Stores data in the in-memory cache associated with a unique key and an optional TTL.
 *
 * @template T - The type of data being stored
 * @param key - Unique key identifier (e.g. session UUID or user ID)
 * @param data - Data payload to store in memory
 * @param ttlMs - Time-to-live in milliseconds (defaults to 15 minutes)
 *
 * @example
 * ```ts
 * setStore(sessionId, { targetUserId: "123456", action: "ban" }, 30 * 1000);
 * ```
 */
export const setStore = <T>(key: string, data: T, ttlMs = DEFAULT_TTL): void => {
  store.set(key, {
    data,
    eat: Date.now() + ttlMs,
  });
};

/**
 * Retrieves stored data by key. Automatically deletes expired entries and returns `null`.
 *
 * @template T - Expected type of the stored data
 * @param key - Unique key identifier
 * @returns The stored data payload, or `null` if expired or non-existent
 *
 * @example
 * ```ts
 * const state = getStore<{ targetUserId: string }>(sessionId);
 * ```
 */
export const getStore = <T>(key: string): T | null => {
  const entry = store.get(key);
  if (!entry) return null;

  if (Date.now() > entry.eat) return store.delete(key) ? null : null;

  return entry.data as T;
};

/**
 * Atomically retrieves and deletes stored data in a single operation.
 * Ideal for single-use tokens, confirmation buttons, or claims to prevent double execution.
 *
 * @template T - Expected type of the stored data
 * @param key - Unique key identifier
 * @returns The stored data payload, or `null` if expired or non-existent
 *
 * @example
 * ```ts
 * const data = takeStore<{ secretCode: string }>(sessionId);
 * if (!data) return interaction.reply("Expired or already claimed!");
 * ```
 */
export const takeStore = <T>(key: string): T | null => {
  const data = getStore<T>(key);
  if (data !== null) store.delete(key);
  return data;
};

/**
 * Manually deletes an entry from the store by key.
 *
 * @param key - Unique key identifier
 * @returns `true` if an element existed and was removed, `false` otherwise
 */
export const deleteStore = (key: string): boolean => {
  return store.delete(key);
};

const cleanUpStore = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.eat) store.delete(key);
  }
}, 60 * 1000);

cleanUpStore.unref();
