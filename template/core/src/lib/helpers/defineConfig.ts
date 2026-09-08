import type { ActivityType, GatewayIntentBits, Partials, PresenceStatusData } from "discord.js";

export interface ErrorContext {
  name: string;
  source: "command" | "event" | "worker" | "component" | "gateway" | "dbEvent";
}

export interface DjsConfig {
  intents: GatewayIntentBits[];
  partials: Partials[];
  modulesDir: string;

  presence?: {
    status?: PresenceStatusData;
    activity?: {
      name: string;
      type?: ActivityType;
    };
  };

  bullmq?: {
    hostname: string;
    port: number;
    queueName: string;
  };

  logLevel?: "silent" | "error" | "warn" | "info" | "debug";

  onError?: (error: unknown, ctx: ErrorContext) => unknown | Promise<unknown>;
}

export type ResolvedDjsConfig = {
  intents: GatewayIntentBits[];
  partials: Partials[];
  modulesDir: string;
  presence?: {
    status?: PresenceStatusData;
    activity?: {
      name: string;
      type?: ActivityType;
    };
  };
  bullmq?: {
    hostname: string;
    port: number;
    queueName: string;
  };
  logLevel?: "silent" | "error" | "warn" | "info" | "debug";
  onError?: (error: unknown, ctx: ErrorContext) => unknown | Promise<unknown>;
};

export const defineConfig = (config: DjsConfig) => config;
