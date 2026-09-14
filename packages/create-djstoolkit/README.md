# create-djstoolkit

Scaffold a blazing-fast, enterprise-grade [Discord.js](https://discord.js.org) bot in one command. Get slash commands, events, buttons, dropdowns, and modals out-of-the-box, with powerful opt-in features like Prisma, BullMQ, In-Memory State Store, and Pub/Sub Event Relay.

[GitHub](https://github.com/fakejsdev/djstoolkit) · [npm](https://www.npmjs.com/package/create-djstoolkit)

## Quick start

```bash
bun create djstoolkit
```

Requires [Bun](https://bun.sh) — the generated project runs on Bun, not Node.

## What you're asked

1. **Project name** — used as the directory name and `package.json` name.
2. **Scaffold Type** — choose between a clean `Barebones` project or a `Full Scaffold` with fully functional example modules.
3. **Features (À La Carte)** — pick any combination:
   - **Database** — PostgreSQL via Prisma ORM
   - **BullMQ** — background jobs, delayed tasks, scheduled reminders (Redis)
   - **In-Memory Store** — a built-in TTL cache for sharing state securely between commands and components
   - **Event Relay** — a type-safe internal Pub/Sub event bus to decouple your modules
4. **Hosting** (per selected feature) — Docker Compose (zero setup, recommended) or your own connection string.
5. **Git** — initialize a repository.
6. **Install dependencies** — run `bun install` automatically.

Everything else — commands, events, buttons, dropdowns, modals — is included in the Core every time, no prompt needed.

## How each feature actually works

Every handler type follows the exact same shape: you use a heavily typed `defineX` helper function to export `config` and `run`. The loader finds files by their suffix, validates the exports, and wires them up — you never touch a registry or index file yourself.

### Commands — `*.command.ts`

```ts
// src/modules/ping/commands/ping.command.ts
import { defineCommand } from "@/lib/helpers/defineCommand";

export const { config, run } = defineCommand(
  {
    name: "ping",
    description: "Replies with pong",
  },
  async (interaction) => {
    await interaction.reply("pong");
  }
);
```

Subcommands and groups get their own suffixes (`*.sub.ts` for a subcommand, combined via `defineCommandGroup` in a `*.group.ts` file) — no manual `SlashCommandBuilder` boilerplate. Commands are diffed against a local cache, so re-registering with Discord API only happens when something actually changed.

### Events — `*.djs.ts`

```ts
// src/modules/logging/events/messageLogger.djs.ts
import { defineEvent } from "@/lib/helpers/defineEvent";

export const { config, run } = defineEvent(
  {
    on: "messageCreate",
    name: "message-logger",
    description: "Logs every message",
  },
  async (message) => {
    console.log(`${message.author.tag}: ${message.content}`);
  }
);
```

`config.on` is typed against Discord.js's own `ClientEvents` — `run`'s parameters are automatically the correct type for whichever event you listened to.

### Components (Buttons, Dropdowns, Modals)

```ts
// src/modules/fun/buttons/hello.button.ts
import { defineButton } from "@/lib/helpers/defineButton";

export const { config, run } = defineButton(
  {
    customId: "HELLO_BTN",
    name: "hello",
    description: "Says hi back",
  },
  async (interaction, sessionId) => {
    await interaction.reply(`Hi! Session: ${sessionId}`);
  }
);
```

Matched to incoming interactions by `customId`. The framework supports **prefix-routing** out of the box — if you set your button's ID to `HELLO_BTN:123`, the framework automatically routes to `HELLO_BTN` and passes `123` as the `sessionId`!

### Database events — `*.db.ts` (Database feature)

Every Prisma create/update/delete/upsert emits an event you can listen to:

```ts
// src/modules/users/events/onUserCreate.db.ts
import { defineDbEvent } from "@/lib/helpers/defineDbEvent";

export const { config, run } = defineDbEvent(
  {
    on: "User.create",
    name: "welcome-new-user",
    description: "Runs after a new User row is created",
  },
  async (args) => {
    const user = await args.query(args.args);
    console.log(`New user: ${user.id}`);
    return user;
  }
);
```

`config.on` is typed as `` `${ModelName}.${create|update|delete|upsert}` `` — generated from your own `schema.prisma`, so it stays correct as your schema grows.

### Workers — `*.worker.ts` (BullMQ feature)

```ts
// src/modules/reminders/workers/sendReminder.worker.ts
import { defineWorker } from "@/lib/helpers/defineWorker";

export const { config, run } = defineWorker(
  {
    name: "send-reminder",
    description: "Sends a delayed reminder",
  },
  async (job) => {
    console.log("Reminder:", job.data);
  }
);
```

Queue a job from anywhere with `enqueueJob("send-reminder", data)`. Types are guaranteed end-to-end via the global `JobRegistry`.

## What you get, out of the box

```
my-bot/
├── src/
│   ├── handlers/          all the loaders above, wired together
│   ├── lib/                discord client, logger, cache, config helpers
│   └── modules/             ← your commands/events/buttons/workers go here
├── djs.config.ts            intents, presence, logging, feature config
├── globals.d.ts              typed process.env
├── docker-compose.services.yml   only if you picked Docker for something
└── package.json
```

Selecting **Database** or **BullMQ** adds their handlers, `.env` variables, and Docker service — nothing you didn't select gets added.

## Scripts in your generated project

| Script | What it does |
|---|---|
| `bun run dev` | Start the bot with file-watching |
| `bun run start` | Start without watching (production) |
| `bun run typecheck` | `tsc --noEmit` |
| `bun run lint` / `format` | Biome check / auto-fix |
| `bun run services:up` / `down` / `reset` | Docker services for whatever you chose (`reset` also wipes volumes) |
| `bun run prisma:push` / `generate` / `studio` | Only if you picked Database |

## After scaffolding

```bash
cd my-bot
bun install                          # if you skipped it during setup
```
