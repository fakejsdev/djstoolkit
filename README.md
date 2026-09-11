# djstoolkit

An opinionated Discord.js bot framework + scaffolding CLI. Get a fully working bot — commands, events, buttons, dropdowns — running in minutes, with database (Prisma) and background jobs (BullMQ) as opt-in features.

```bash
bun create djstoolkit
```

## What's in this repo

This is a monorepo containing both the CLI and the bot template it scaffolds.

```
djstoolkit/
├── packages/
│   └── create-djstoolkit/     the scaffolding CLI (published to npm)
└── template/
    ├── core/                  always included: commands, events, components, config, logger
    └── features/
        ├── database/          opt-in: Prisma ORM + PostgreSQL
        └── bullmq/            opt-in: background jobs via BullMQ + Redis
```

`create-djstoolkit` never invents code — it copies files straight out of `template/` and wires them together based on what you select.

## Architecture

### `defineX(config, run)` pattern

Every handler type (commands, events, buttons, dropdowns, workers, database events) is declared with the same shape: a `config` object and a `run` function.

```ts
export const config = { name: "ping", description: "Replies with pong" };
export const run = async (interaction) => interaction.reply("pong");
```

This keeps every file self-contained and type-correlated — `run`'s parameter type is derived from `config` (e.g. which Discord event you listened to), so there's nothing to keep in sync manually.

### Core vs. features

Code lives in `core/` if it works with zero external infrastructure. It moves to `features/` the moment it needs something running outside the bot process (a database, a Redis instance). This is the rule — not "is it optional."

### Registry + installer pattern

`create-djstoolkit` doesn't merge template fragments at runtime. Each feature owns one `installer(targetDir, answers)` function that copies its own files, updates `package.json`, injects its config block, and merges its `docker-compose` service — all in one place. The CLI just loops over selected features and calls their installers. Adding a feature to the CLI means adding one entry to a registry and one installer file — no changes to the scaffolding engine itself. (Same pattern used by `create-t3-app`'s `installers` map.)

## Development

This is a Bun workspace. `template/core`, `template/features/database`, and `template/features/bullmq` are themselves workspace packages — each has its own `package.json`/`tsconfig.json`, so you can open and edit files directly inside them with full type-checking, no need to scaffold a project first to test a change.

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
