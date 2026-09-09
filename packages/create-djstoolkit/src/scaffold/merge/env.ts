import type { Feature } from "../../prompts";
import { mergeText } from "./text";

export const mergeEnv = (targetDir: string, features: Feature[]) =>
  mergeText(".env.example", targetDir, features);
