import type { ActivityType, GatewayIntentBits, Partials, PresenceStatusData } from "discord.js";

export interface ErrorContext {
  name: string;
  source: "command" | "event" | "worker" | "component" | "gateway" | "dbEvent" | "relay";
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

  onError?: (error: unknown, ctx: ErrorContext) => unknown | Promise<unknown>;
}

/**
 * Defines the central bot configuration in `djs.config.ts` with strict type-checking and autocompletion.
 *
 * @param config - The bot configuration object containing gateway intents, partials, presence, and error handling
 * @returns The validated bot configuration object
 *
 * @example
 * ```ts
 * export default defineConfig({
 *   intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
 *   partials: [Partials.Channel, Partials.Message],
 *   modulesDir: "./src/modules",
 *   presence: {
 *     status: "online",
 *     activity: {
 *       name: "DJSToolkit Bot",
 *       type: ActivityType.Playing,
 *     },
 *   },
 *   onError: (error, ctx) => {
 *     console.error(`[${ctx.source}:${ctx.name}] Error occurred:`, error);
 *   },
 * });
 * ```
 */
export const defineConfig = (config: DjsConfig): DjsConfig => config;
