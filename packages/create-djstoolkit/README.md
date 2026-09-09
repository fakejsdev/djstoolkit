# create-djstoolkit

Scaffold a new [Discord.js](https://discord.js.org) bot using [djstoolkit](https://github.com/fakejsdev/djstoolkit) — commands, events, and components included by default, with database and queue support opt-in.

## Requirements

- [Bun](https://bun.sh) installed and available in your `PATH`

## Usage

```bash
npm create djstoolkit
```

or

```bash
bun create djstoolkit
```

Follow the prompts:

- **Project name** — used as both the directory name and `package.json` name
- **Features** — pick any combination of:
  - **Database** — PostgreSQL via Prisma
  - **BullMQ** — background jobs, delayed tasks, scheduled reminders
- **Hosting** — for each selected feature, run it via Docker Compose or bring your own connection
- **Git** — initialize a git repository
- **Install dependencies** — run `bun install` automatically

## What you get

Every project includes, out of the box:

- Slash commands (with subcommands and groups)
- Discord event handlers
- Button and dropdown component handlers
- A typed `djs.config.ts` for intents, presence, and logging

Selecting **Database** or **BullMQ** adds their respective handlers, config, `.env` variables, and `docker-compose.yml` services — nothing you don't select gets added to your project.

## After scaffolding

```bash
cd <your-project-name>
bun install        # if you skipped it during setup
docker compose up -d   # if you chose Docker for any feature
bun run dev
```

## License

MIT
