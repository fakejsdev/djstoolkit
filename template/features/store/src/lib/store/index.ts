type StoreEntry<T = unknown> = {
  data: T;
  eat: number;
};

const store = new Map<string, StoreEntry>();
const DEFAULT_TTL = 15 * 60 * 1000;

export const setStore = <T>(key: string, data: T, ttlMs = DEFAULT_TTL) => {
  store.set(key, {
    data,
    eat: Date.now() + ttlMs,
  });
};

export const getStore = <T>(key: string): T | null => {
  const entry = store.get(key);
  if (!entry) return null;

  if (Date.now() > entry.eat) return store.delete(key) ? null : null;

  return entry.data as T;
};

export const takeStore = <T>(key: string): T | null => {
  const data = getStore<T>(key);
  if (data !== null) store.delete(key);
  return data;
};

export const deleteStore = (key: string) => {
  return store.delete(key);
};

const cleanUpStore = setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.eat) store.delete(key);
  }
}, 60 * 1000);

cleanUpStore.unref();
