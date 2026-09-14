<div align="center">
  <h1>🧩 DJSToolkit</h1>
  <p><strong>A blazing-fast, enterprise-grade Discord.js bot framework + scaffolding CLI powered by Bun.</strong></p>
</div>

Get a fully working bot — commands, events, buttons, dropdowns, and modals — running in minutes. Scale infinitely with modular, opt-in features like PostgreSQL databases, Redis queues, and internal event buses.

```bash
bun create djstoolkit
```

---

## 📖 Documentation

Full documentation is available in the [`/docs`](./docs) folder:
- [Getting Started & Installation](./docs/getting-started.md)
- [Core Features (Commands, Components, Events)](./docs/core/commands.md)
- [Modular Features (DB, BullMQ, Store, Relay)](./docs/features/database.md)

---

## ✨ Features

- **Blazing Fast**: Powered by Bun. Starts instantly, runs incredibly fast.
- **Maximum Flexibility**: Choose what you need via the CLI. Want Prisma? BullMQ? Just select them.
- **Revolutionary Component Routing**: Say goodbye to complicated Collectors. DJSToolkit routes Buttons, Dropdowns, and Modals dynamically with session state using a smart `prefix:uuid` router.
- **Strict Type-Safety**: Intelligent `JobRegistry` and `RelayRegistry` ensure you get 100% IntelliSense across your entire codebase via Module Augmentation.
- **File-Based Handlers**: No giant switch statements. Just drop a file in `src/modules/` and export `config` and `run`.

---

## 🏗️ What's in this repo?

This is a monorepo containing both the CLI and the bot template it scaffolds.

```text
djstoolkit/
├── packages/
│   └── create-djstoolkit/     # The scaffolding CLI (published to npm)
├── docs/                      # Official Documentation
└── template/
    ├── core/                  # Included: commands, events, components, config, logger
    ├── examples/              # Fully working example modules for full-scaffold
    └── features/
        ├── database/          # Opt-in: Prisma ORM + PostgreSQL
        ├── bullmq/            # Opt-in: Background jobs via BullMQ + Redis
        ├── store/             # Opt-in: In-Memory TTL Cache for component state
        └── relay/             # Opt-in: Type-safe internal event bus (Pub/Sub)
```

`create-djstoolkit` never invents code — it copies files straight out of `template/` and wires them together based on your selections.

---

## 📐 Architecture

### `defineX(config, run)` pattern

Every handler type (commands, events, buttons, dropdowns, modals, workers, database events) is declared with the exact same shape: a `config` object and a `run` function.

```ts
import { defineCommand } from "@/lib/helpers/defineCommand";

export const { config, run } = defineCommand(
  { name: "ping", description: "Replies with pong" },
  async (interaction) => interaction.reply("pong")
);
```

This keeps every file self-contained and perfectly typed.

### Registry + Installer pattern

`create-djstoolkit` doesn't merge template fragments at runtime. Each feature owns one `installer(targetDir, answers)` function that copies its own files, updates `package.json`, injects its config block, and merges its `docker-compose` service — all in one place. Adding a feature to the CLI means adding one entry to a registry and one installer file.

---

## 🛠️ Development

This is a Bun workspace. `template/core` and all features inside `template/features/` are themselves workspace packages. Each has its own `package.json` and `tsconfig.json` so you can open and edit files directly inside them with full type-checking—no need to scaffold a project first to test a change.

```bash
bun install
bun test              # runs dependency-sync checks across features
```

To try a change end-to-end, run the CLI against the actual template:

```bash
cd packages/create-djstoolkit
bun src/index.ts
```

### Adding a feature

1. Add your source files under `template/features/<name>/src/`.
2. Add `dependencies.ts` (and `installer.ts`) under `packages/create-djstoolkit/src/features/<name>/`.
3. Register it in `packages/create-djstoolkit/src/features/registry.ts`.

Nothing else in the CLI needs to change.

## Packages

- [`packages/create-djstoolkit`](packages/create-djstoolkit) — the CLI, published as [`create-djstoolkit`](https://www.npmjs.com/package/create-djstoolkit) on npm.

## License

MIT
