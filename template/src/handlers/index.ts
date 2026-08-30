import type { ResolvedDjsConfig } from "@/lib/helpers/defineConfig";
import { initCommandHandler } from "./commands/commandsHandler";

export const initHandlers = async (config: ResolvedDjsConfig) => {
  if (config.handlers.commands) await initCommandHandler();
};
