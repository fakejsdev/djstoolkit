import type { Answers } from "@/prompts";
import { installBullmq } from "./bullmq/installer";
import { copyBullmqTemplate } from "./bullmq/template";
import { installDatabase } from "./database/installer";
import { copyDbTemplate } from "./database/template";
import { installRelay } from "./relay/installer";
import { copyRelayTemplate } from "./relay/template";
import { installStore } from "./store/installer";
import { copyStoreTemplate } from "./store/template";

export type Feature = "db" | "bullmq" | "store" | "relay";
export type Hosting = (typeof HOSTING_OPTIONS)[number]["value"];

export interface FeatureDefinition {
  id: Feature;
  label: string;
  hint: string;
  providers: { id: string; label: string; needsHosting?: boolean }[];
  installer: (targetDir: string, answers: Answers) => Promise<unknown>;
  templateCopier?: (targetDir: string) => Promise<unknown> | unknown;
}

export const HOSTING_OPTIONS = [
  {
    value: "docker",
    label: "Docker Compose - Recommended",
    hint: "Zero Config, we setup everything for you",
  },
  {
    value: "own",
    label: "Own Hosting",
    hint: "Bring your own connection string",
  },
] as const;

export const FEATURES: FeatureDefinition[] = [
  {
    id: "store",
    label: "In-Memory Store",
    hint: "Share data between commands & components",
    providers: [],
    installer: installStore,
    templateCopier: copyStoreTemplate,
  },
  {
    id: "relay",
    label: "Event Relay (Pub/Sub)",
    hint: "Type-safe internal event bus for module communication",
    providers: [],
    installer: installRelay,
    templateCopier: copyRelayTemplate,
  },
  {
    id: "db",
    label: "Database",
    hint: "Supported DBs via Prisma ORM",
    providers: [{ id: "postgresql", label: "PostgreSQL", needsHosting: true }],
    installer: installDatabase,
    templateCopier: copyDbTemplate,
  },
  {
    id: "bullmq",
    label: "BullMQ",
    hint: "Background jobs, delayed tasks, scheduled reminders",
    providers: [{ id: "redis", label: "Redis", needsHosting: true }],
    installer: installBullmq,
    templateCopier: copyBullmqTemplate,
  },
];
