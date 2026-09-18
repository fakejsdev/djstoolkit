export const createSessionId = (baseId: string) => {
  if (baseId.includes(":")) throw new Error(`Base ID '${baseId}' cannot contain a colon (:).`);
  return `${baseId}:${crypto.randomUUID()}`;
};

export const createCustomIdWithData = (baseId: string, data: string) => {
  if (baseId.includes(":")) throw new Error(`Base ID '${baseId}' cannot contain a colon (:).`);
  return `${baseId}:${data}`;
};
