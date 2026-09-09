import type { Feature } from "../../prompts";
import { mergeText } from "./text";

export const mergeGitignore = (targetDir: string, features: Feature[]) =>
  mergeText("gitignore", ".gitignore", targetDir, features);
