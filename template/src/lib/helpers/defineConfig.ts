import type { ActivityType, GatewayIntentBits, Partials, PresenceStatusData } from "discord.js";

export interface ErrorContext {
  name: string;
  source: "command" | "event" | "worker" | "component";
}

export interface DjsConfig {
  intents: GatewayIntentBits[];
  partials: Partials[];
  modulesDir?: string;

  handlers: {
    all?: boolean;
    commands?: boolean;
    discordEvents?: boolean;
    databaseEvents?: boolean;
    workers?: boolean;
    components?: boolean;
  };

  presence?: {
    status?: PresenceStatusData;
    activity?: {
      name: string;
      type?: ActivityType;
    };
  };

  logLevel?: "silent" | "error" | "warn" | "info" | "debug";

  onError?: (error: unknown, ctx: ErrorContext) => unknown | Promise<unknown>;
}

export const defineConfig = (config: DjsConfig) => config;
