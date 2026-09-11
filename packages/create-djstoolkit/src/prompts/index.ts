import { cancel, confirm, isCancel, log, multiselect, select, text } from "@clack/prompts";

import { FEATURES, type Feature, HOSTING_OPTIONS, type Hosting } from "@/features/registry";
import { isDirEmpty } from "@/utils/isDirEmpty";
import { validateName } from "@/utils/validateName";

export type Answers = Awaited<ReturnType<typeof getAnswers>>;

async function ask<T>(fn: () => Promise<T | symbol>): Promise<T> {
  const result = await fn();
  if (isCancel(result)) {
    cancel("Canceled.");
    process.exit(0);
  }
  return result as T;
}

export const getAnswers = async () => {
  const name = await ask(() =>
    text({
      message: "What's the name of your project?",
      placeholder: "my-awesome-bot",
      validate: validateName,
    }),
  );

  const isEmpty = isDirEmpty(name);
  if (!isEmpty) {
    cancel(`Directory "${name}" already exists and is not empty.`);
    process.exit(1);
  }

  log.info("Included handlers by Default\n✔ Commands\n✔ Discord Events\n✔ Buttons & Dropdowns");

  const features = await ask(() =>
    multiselect<Feature>({
      message: "Which features do you want to include?",
      options: FEATURES.map(({ id: value, label, hint }) => ({ value, label, hint })),
      required: false,
    }),
  );

  const dbFeature = FEATURES.find((f) => f.id === "db")!;

  const dbProvider = features.includes("db")
    ? await ask(() =>
        select({
          message: "Which database do you want to use?",
          options: dbFeature.providers.map(({ id: value, label }) => ({ value, label })),
        }),
      )
    : undefined;

  const dbSelectedProvider = dbFeature.providers.find((p) => p.id === dbProvider);

  const dbHosting = dbSelectedProvider?.needsHosting
    ? await ask(() =>
        select<Hosting>({
          message: `How do you want to run ${dbSelectedProvider.label}?`,
          options: [...HOSTING_OPTIONS],
        }),
      )
    : undefined;

  const bullmqFeature = FEATURES.find((f) => f.id === "bullmq")!;
  const bullmqProvider = bullmqFeature.providers[0];

  const bullmqHosting =
    features.includes("bullmq") && bullmqProvider?.needsHosting
      ? await ask(() =>
          select<Hosting>({
            message: `How do you want to run ${bullmqProvider.label}? (Required for BullMQ)`,
            options: [...HOSTING_OPTIONS],
          }),
        )
      : undefined;

  const gitInit = await ask(() =>
    confirm({
      message: "Initialize Git repository?",
    }),
  );

  const installDependencies = await ask(() =>
    confirm({
      message: "Install dependencies?",
    }),
  );

  return { name, features, dbProvider, dbHosting, bullmqHosting, gitInit, installDependencies };
};
