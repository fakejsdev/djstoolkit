import { existsSync, readdirSync } from "node:fs";
import { cancel, confirm, intro, isCancel, multiselect, note, select, text } from "@clack/prompts";
import pc from "picocolors";
import pkg from "../package.json";

type Feature = "db" | "bullmq";
type DbProvider = "postgresql" | "sqlite";

async function ask<T>(fn: () => Promise<T | symbol>): Promise<T> {
  const result = await fn();
  if (isCancel(result)) {
    cancel("Canceled.");
    process.exit(0);
  }
  return result as T;
}

const NAME_REGEX = /^[a-z0-9-]+$/;

const validate = (value: string | undefined) => {
  if (!value) return "Name is required.";
  if (value.length > 50) return "Must be 50 characters or fewer.";
  if (!value.match(NAME_REGEX)) return "Only lowercase letters, numbers, and hyphens are allowed.";

  return undefined;
};

const isDirEmpty = (name: string) => {
  if (!existsSync(name)) return true;
  return readdirSync(name).length === 0;
};

const SERVER_BASED_DBS: DbProvider[] = ["postgresql"];
const DB_LABELS: Record<DbProvider, string> = {
  postgresql: "PostgreSQL",
  sqlite: "SQLite",
};

export const getAnswers = async () => {
  intro(
    `${pc.bgCyan(pc.black(` djstoolkit v${pkg.version} `))} ${pc.dim("scaffold a new Discord Bot")}`,
  );

  const name = await ask(() =>
    text({
      message: "What's the name of your project?",
      placeholder: "my-awesome-bot",
      validate,
    }),
  );

  const isEmpty = isDirEmpty(name);
  if (!isEmpty) {
    cancel(`Directory "${name}" already exists and is not empty.`);
    process.exit(1);
  }

  note("✔ Commands\n✔ Discord Events\n✔ Buttons & Dropdowns", "Included by default");

  const features = await ask(() =>
    multiselect<Feature>({
      message: "Which features do you want to include?",
      options: [
        {
          value: "db",
          label: "Database",
          hint: "Supported DBs via Prisma ORM",
        },
        {
          value: "bullmq",
          label: "BullMQ",
          hint: "Background jobs, delayed tasks, scheduled reminders",
        },
      ],
      required: false,
    }),
  );

  const dbProvider = features.includes("db")
    ? await ask(() =>
        select<DbProvider>({
          message: "Which database do you want to use?",
          options: [
            {
              value: "postgresql",
              label: "PostgreSQL",
            },
            {
              value: "sqlite",
              label: "SQLite3",
              disabled: true,
              hint: "Work in Progress",
            },
          ],
        }),
      )
    : undefined;

  const dbHosting =
    dbProvider && SERVER_BASED_DBS.includes(dbProvider)
      ? await ask(() =>
          select({
            message: `How do you want to run ${DB_LABELS[dbProvider]}?`,
            options: [
              {
                value: "docker",
                label: "Docker Compose",
                hint: "Recommended - zero setup, fully automated",
              },
              {
                value: "own",
                label: "Own Connection",
                hint: "Provide your own connection string",
              },
            ],
          }),
        )
      : undefined;

  const bullmqHosting = features.includes("bullmq")
    ? await ask(() =>
        select({
          message: "How do you want to run Redis? (Required for BullMQ)",
          options: [
            {
              value: "docker",
              label: "Docker Compose",
              hint: "Recommended - zero setup, fully automated",
            },
            {
              value: "own",
              label: "Own Connection",
              hint: "Provide your own connection credentials",
            },
          ],
        }),
      )
    : undefined;

  const gitInit = await ask(() =>
    confirm({
      message: "Initialize Git repository?",
    }),
  );

  const installDeps = await ask(() =>
    confirm({
      message: "Install dependencies?",
    }),
  );

  return { name, features, dbProvider, dbHosting, bullmqHosting, gitInit, installDeps };
};

console.log(await getAnswers());
