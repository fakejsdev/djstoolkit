# Database (Prisma ORM)

If you selected the **Database** feature during scaffolding, DJSToolkit sets up a PostgreSQL database powered by [Prisma](https://www.prisma.io/), one of the most popular and developer-friendly Node.js ORMs.

---

## 1. Modular Database Schema (`.prisma`)

Instead of writing a massive `schema.prisma` file containing tables for your entire bot, DJSToolkit utilizes **Prisma Schema Folders** (available in Prisma 7+).

This means you can keep your database models strictly inside their respective modules, preventing a monolithic architecture!

### Example: Economy Model
Just create a file ending in `.prisma` anywhere inside the `db/` folder:

```prisma
// db/User.prisma

model User {
    id        String   @id // Discord Snowflake ID
    xp        Int      @default(0)
    level     Int      @default(1)
    joinDate  DateTime @default(now())
}
```

Whenever you modify your `.prisma` files, sync them with the database and regenerate the TypeScript types using the provided scripts:

```bash
bun run prisma:push     # Pushes the schema to the database
bun run prisma:generate # Updates the autocomplete types
```

---

## 2. Using the Database Client (`prisma`)

The Prisma client is pre-configured and exported from `@/lib/prisma`. It is instantiated once and safe to use across your entire application.

```typescript
// src/modules/economy/commands/profile.command.ts
import { defineCommand } from "@/lib/helpers/defineCommand";
import { prisma } from "@/lib/prisma";

export const { config, run } = defineCommand(
  {
    name: "profile",
    description: "View your user profile",
  },
  async (interaction) => {
    // Upsert ensures we create the user if they don't exist yet,
    // or we fetch them if they do!
    const user = await prisma.user.upsert({
      where: { id: interaction.user.id },
      update: {},
      create: { id: interaction.user.id }
    });

    await interaction.reply(`You are level ${user.level} with ${user.xp} XP.`);
  }
);
```

---

## 3. Database Events (`.db.ts`)

Sometimes you want to execute logic whenever a specific database action happens. DJSToolkit provides a `dbEventsHandler` and a `defineDbEvent` helper allowing you to hook into Prisma's client extensions.

You can create files ending in `.db.ts` to attach lifecycle hooks to your models.

```typescript
// src/modules/economy/db/userLevelUp.db.ts
import { defineDbEvent } from "@/lib/helpers/defineDbEvent";

export const { config, run } = defineDbEvent(
  {
    model: "user",   // The Prisma model you want to hook into
    operation: "update", // The operation (create, update, delete, etc.)
    name: "Level Up Checker",
    description: "Checks if a user leveled up after their XP is updated",
  },
  async (args) => {
    // args contains the original Prisma query
    const result = await args.query(args.args);

    // Run your custom logic after the database updates!
    if (result.xp > 100 && result.level === 1) {
      console.log(`User ${result.id} should level up!`);
      // You could emit a Relay event here!
    }

    return result;
  }
);
```

---

## 4. Visualizing Your Data

DJSToolkit includes a script to open Prisma Studio, a beautiful web UI for viewing and editing your database records:

```bash
bun run prisma:studio
```