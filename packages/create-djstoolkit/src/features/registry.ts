import type { Answers } from "@/prompts";
import { installBullmq } from "./bullmq/installer";
import { installDatabase } from "./database/installer";

export type Feature = "db" | "bullmq";
export type Hosting = (typeof HOSTING_OPTIONS)[number]["value"];

export interface FeatureDefinition {
  id: Feature;
  label: string;
  hint: string;
  providers: { id: string; label: string; needsHosting?: boolean }[];
  installer: (targetDir: string, answers: Answers[]) => Promise<unknown>;
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
    id: "db",
    label: "Database",
    hint: "Supported DBs via Prisma ORM",
    providers: [{ id: "postgresql", label: "PostgreSQL", needsHosting: true }],
    installer: installDatabase,
  },
  {
    id: "bullmq",
    label: "BullMQ",
    hint: "Background jobs, delayed tasks, scheduled reminders",
    providers: [{ id: "redis", label: "Redis", needsHosting: true }],
    installer: installBullmq,
  },
];
