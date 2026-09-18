export const createSessionId = (baseId: string) => `${baseId}:${crypto.randomUUID()}`;

export const createCustomIdWithData = (baseId: string, data: string) => `${baseId}:${data}`;
