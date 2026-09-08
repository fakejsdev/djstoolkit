import { cancel, confirm, group, intro, outro, select, text } from "@clack/prompts";

intro("🧩 Create new Discord Bot with DjsToolkit");

const answers = await group(
  {
    name: () =>
      text({
        message: "What's the name of your project?",
        placeholder: "my-awesome-bot",
        validate: (v) => (!v ? "Required." : undefined),
      }),

    database: () =>
      select({
        message: "Which database do you want?",
        options: [
          {
            value: "postgresql",
            label: "PostgreSQL",
          },
          {
            value: "sqlite3",
            label: "SQLite3",
            hint: "Work in Progress",
            disabled: true,
          },
          {
            value: "none",
            label: "None",
          },
        ],
      }),

    databaseService: ({ results }) =>
      results.database === "postgresql"
        ? select({
            message: "How do you want to run the database?",
            options: [
              {
                value: "docker",
                label: "Docker Compose (recommended)",
                hint: "Zero config — we set everything up for you",
              },
              {
                value: "own",
                label: "I already have my own",
                hint: "Self-hosted / managed — you provide the connection string",
              },
            ],
          })
        : undefined,

    bullmq: () =>
      confirm({
        message: "Add BullMQ queue?",
      }),

    bullMqService: ({ results }) =>
      results.bullmq
        ? select({
            message: "How do you want to run Redis?",
            options: [
              {
                value: "docker",
                label: "Docker Compose (recommended)",
                hint: "Zero config — we set everything up for you",
              },
              {
                value: "own",
                label: "I already have my own",
                hint: "Self-hosted / managed — you provide the host & port",
              },
            ],
          })
        : undefined,

    gitInit: () => confirm({ message: "Initialize git repository?" }),
    installDeps: () => confirm({ message: "Install dependencies?" }),
  },
  {
    onCancel: () => {
      cancel("Canceled.");
      process.exit(0);
    },
  },
);

outro("Done! cd into your project and run `bun run dev`.");
