const CACHE_DIR = ".djs";

export const isCacheValid = async (key: string, data: unknown) => {
  const file = Bun.file(`${CACHE_DIR}/.${key}.cache`);
  const exists = await file.exists();

  if (!exists) return false;

  const currentHash = Bun.hash(JSON.stringify(data)).toString(16);
  const prevHash = await file.text();

  return currentHash === prevHash;
};

export const updateCache = async (key: string, data: unknown) => {
  const currentHash = Bun.hash(JSON.stringify(data)).toString(16);
  await Bun.write(`${CACHE_DIR}/.${key}.cache`, currentHash);
};
