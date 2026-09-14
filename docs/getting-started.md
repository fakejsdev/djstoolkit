# Getting Started with DJSToolkit

Welcome to **DJSToolkit**! This framework is designed to be the ultimate foundation for building scalable, enterprise-grade Discord bots. Powered by [Bun](https://bun.sh/) and [Discord.js](https://discord.js.org/), it focuses on **maximum flexibility, strict type-safety, and incredible developer experience (DX)**.

Whether you're building a simple utility bot or a complex system with background jobs and database persistence, DJSToolkit configures everything for you in seconds.

---

## Prerequisites

Before creating your project, ensure you have the following installed on your machine:
- [Bun](https://bun.sh/) (v1.0 or higher) - The all-in-one JavaScript runtime.
- *Optional:* Docker & Docker Compose (if you plan to use local databases or Redis via our automated setup).

---

## Creating a New Project

The easiest way to start is by using our interactive CLI. Run the following command in your terminal:

```bash
bun create djstoolkit my-awesome-bot
```

### The Setup Wizard

The CLI will guide you through a series of prompts to tailor the framework exactly to your needs:

1. **Scaffold Type:**
   - **Full Scaffold:** Generates the project along with fully functional example modules. Highly recommended if this is your first time using DJSToolkit.
   - **Barebones:** Provides a clean, empty directory structure ready for your custom code.
2. **Features (À La Carte):**
   Choose exactly what you need. The framework is strictly modular—you only get the code you select:
   - **Database:** Sets up [Prisma ORM](https://www.prisma.io/) (PostgreSQL) for type-safe database access.
   - **BullMQ:** Configures Redis-backed queues and workers for handling delayed or heavy background tasks.
   - **In-Memory Store:** A built-in TTL cache for sharing state securely between commands and UI components (Buttons/Modals).
   - **Event Relay:** A type-safe, internal Pub/Sub event bus to decouple your modules.
3. **Hosting Options:**
   If you select Database or BullMQ, you'll be asked if you want to use **Docker Compose**. If you select Docker, we automatically generate a `docker-compose.services.yml` file to spin up Postgres and Redis instantly.

---

## Project Structure

Once the installation is complete, your project will look similar to this (depending on your selected features):

```text
my-awesome-bot/
├── .env                  # Your environment variables (Discord Token, DB URL)
├── package.json          # Project scripts and dependencies
├── biome.json            # Blazing fast linting and formatting via Biome
├── djs.config.ts         # Central configuration for your bot (folders, intents)
├── db/                   # (Optional) Prisma schema and migration files
└── src/
    ├── index.ts          # Application entry point
    ├── handlers/         # Core framework handlers (Commands, Events, Components)
    ├── lib/              # Utilities (Logger, Store, Relay, Discord client)
    └── modules/          # Your bot's features! (Commands, Buttons, Modals go here)
```

> **Note:** The `src/modules/` directory is where you will spend 90% of your time. DJSToolkit automatically scans this directory to register your commands, events, and components.

---

## Running Your Bot

### 1. Configure your Environment
Open the newly created `.env` file and insert your Discord Bot Token:
```env
DISCORD_BOT_TOKEN="your_token_here"
DEV_GUILD_ID="your_testing_server_id" # Used for instant slash command registration
```

### 2. Start Services (If applicable)
If you opted into Docker Compose for your Database or Redis, start them up using our built-in script:
```bash
bun run services:up
```

### 3. Push Database Schema (If applicable)
If you included the Database feature, push the initial Prisma schema to your database:
```bash
bun run prisma:push
```

### 4. Start the Development Server
Run your bot in watch mode. Any changes you make to your files will automatically restart the bot:
```bash
bun run dev
```

You should see logs indicating that your handlers have been registered and the bot has successfully logged in!

---

## What's Next?

Now that your bot is running, dive deeper into how DJSToolkit handles different interactions:

- [Creating Commands](./core/commands.md)
- [Handling Components (Buttons, Dropdowns, Modals)](./core/components.md)
- [Listening to Events](./core/events.md)