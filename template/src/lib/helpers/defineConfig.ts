import type { ActivityType, GatewayIntentBits, Partials, PresenceStatusData } from "discord.js";

export interface ErrorContext {
  name: string;
  source: "command" | "event" | "worker" | "component" | "gateway";
}

export interface DjsConfig {
  intents: GatewayIntentBits[];
  partials: Partials[];
  modulesDir: string;

  handlers: {
    all?: boolean;
    commands?: boolean;
    events?: boolean;
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

export type ResolvedDjsConfig = {
  handlers: {
    commands: boolean;
    events: boolean;
    databaseEvents: boolean;
    workers: boolean;
    components: boolean;
  };
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
  logLevel?: "silent" | "error" | "warn" | "info" | "debug";
  onError?: (error: unknown, ctx: ErrorContext) => unknown | Promise<unknown>;
};

export const defineConfig = (config: DjsConfig): ResolvedDjsConfig => {
  const { all, ...explicit } = config.handlers;

  return {
    ...config,
    handlers: {
      commands: explicit.commands ?? all ?? false,
      events: explicit.events ?? all ?? false,
      databaseEvents: explicit.databaseEvents ?? all ?? false,
      workers: explicit.workers ?? all ?? false,
      components: explicit.commands ?? all ?? false,
    },
  };
};
