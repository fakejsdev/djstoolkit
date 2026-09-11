import { existsSync, readdirSync } from "node:fs";

export const isDirEmpty = (name: string) => {
  if (!existsSync(name)) return true;
  return readdirSync(name).length === 0;
};
