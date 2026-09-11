# create-djstoolkit

Scaffold a fully working [Discord.js](https://discord.js.org) bot in one command — slash commands, events, buttons, and dropdowns included by default, with a database (Prisma) and background jobs (BullMQ) as opt-in features.

[GitHub](https://github.com/fakejsdev/djstoolkit) · [npm](https://www.npmjs.com/package/create-djstoolkit)

## Quick start

```bash
bun create djstoolkit
```

Requires [Bun](https://bun.sh) — the generated project runs on Bun, not Node.

## What you're asked

1. **Project name** — used as the directory name and `package.json` name.
2. **Features** — pick any combination:
   - **Database** — PostgreSQL via Prisma ORM
   - **BullMQ** — background jobs, delayed tasks, scheduled reminders (Redis)
3. **Hosting** (per selected feature) — Docker Compose (zero setup, recommended) or your own connection string.
4. **Git** — initialize a repository.
5. **Install dependencies** — run `bun install` automatically.

Everything else — commands, events, buttons, dropdowns — is included every time, no prompt needed.

## How each feature actually works

Every handler type follows the same shape: a plain `config` object plus a `run` function, exported from a file with a specific suffix. The loader finds files by that suffix, validates the exports, and wires them up — you never touch a registry or index file yourself.

### Commands — `*.command.ts`

```ts
// src/modules/ping/commands/ping.command.ts
export const config = {
  name: "ping",
  description: "Replies with pong",
};

export const run = async (interaction) => {
  await interaction.reply("pong");
};
```

Subcommands and groups get their own suffixes (`*.group.ts` for a command group, with subcommands defined alongside it) — no manual `SlashCommandBuilder` boilerplate, no manual registration. Commands are diffed against a local cache, so re-registering with Discord only happens when something actually changed.

### Events — `*.djs.ts`

```ts
// src/modules/logging/events/messageLogger.djs.ts
export const config = {
  on: "messageCreate",
  name: "message-logger",
  description: "Logs every message",
};

export const run = async (message) => {
  console.log(`${message.author.tag}: ${message.content}`);
};
```

`config.on` is typed against Discord.js's own `ClientEvents` — `run`'s parameters are automatically the correct type for whichever event you listened to.

### Buttons & Dropdowns — `*.button.ts` / `*.dropdown.ts`

```ts
// src/modules/fun/buttons/hello.button.ts
export const config = {
  customId: "hello-button",
  name: "hello",
  description: "Says hi back",
};

export const run = async (interaction) => {
  await interaction.reply("Hi!");
};
```

Matched to incoming interactions by `customId` — attach one to a message and the handler runs automatically.

### Database events — `*.db.ts` (Database feature)

Every Prisma create/update/delete/upsert emits an event you can listen to, without touching Prisma's own client directly:

```ts
// src/modules/users/events/onUserCreate.db.ts
export const config = {
  on: "User.create",
  name: "welcome-new-user",
  description: "Runs after a new User row is created",
};

export const run = async (user) => {
  console.log(`New user: ${user.id}`);
};
```

`config.on` is typed as `` `${ModelName}.${create|update|delete|upsert}` `` — generated from your own `schema.prisma`, so it stays correct as your schema grows.

### Workers — `*.worker.ts` (BullMQ feature)

```ts
// src/modules/reminders/workers/sendReminder.worker.ts
export const config = {
  name: "send-reminder",
  description: "Sends a delayed reminder",
};

export const run = async (job) => {
  console.log("Reminder:", job.data);
};
```

Enqueue a job from anywhere with `enqueueJob("send-reminder", data)` — the worker with that `name` picks it up.

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
cp .env.example .env                 # then fill in your Discord app credentials
bun run services:up                  # if you chose Docker for anything
bun run prisma:push                  # if you picked Database
bun run dev
```

## License

MIT
