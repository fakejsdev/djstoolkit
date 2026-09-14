# Slash Commands

Creating Slash Commands in DJSToolkit is highly intuitive. The framework handles registering commands with Discord's API, caching them to avoid rate limits, and routing interactions automatically.

Commands are file-based. Any file ending in `.command.ts` inside `src/modules/` is automatically loaded as a base command.

---

## 1. Basic Command (`defineCommand`)

A command consists of a `config` (the JSON structure sent to Discord) and a `run` function. 

DJSToolkit provides a strongly typed `CommandOption` interface so you don't need to import Enums from Discord.js for option types.

```typescript
// src/modules/economy/commands/ping.command.ts
import { defineCommand } from "@/lib/helpers/defineCommand";

export const { config, run } = defineCommand(
  {
    name: "ping",
    description: "Replies with Pong!",
    options: [
      {
        type: "String", // Full IntelliSense for "String", "Integer", "User", etc.
        name: "message",
        description: "An optional message to attach",
        required: false,
      }
    ]
  },
  async (interaction) => {
    const msg = interaction.options.getString("message");
    await interaction.reply(`Pong! ${msg ? `You said: ${msg}` : ""}`);
  }
);
```

---

## 2. Command Permissions

If you want a command to be accessible only by server administrators or moderators, you can use the `permissions` array. DJSToolkit maps this directly to Discord's `default_member_permissions`.

```typescript
import { defineCommand } from "@/lib/helpers/defineCommand";

export const { config, run } = defineCommand(
  {
    name: "ban",
    description: "Bans a user",
    permissions: ["BanMembers", "Administrator"], // Requires either of these permissions
  },
  async (interaction) => {
    // Command logic...
  }
);
```

---

## 3. Subcommands & Groups

For larger bots, you'll want to group commands together (e.g., `/math add`, `/math subtract`). DJSToolkit splits this into multiple files for ultimate cleanliness.

### Step 1: Define Subcommands (`defineSubCommand`)
Subcommands do not have their own `.command.ts` extension. They are just exported variables.

```typescript
// src/modules/math/commands/add.sub.ts
import { defineSubCommand } from "@/lib/helpers/defineSubCommand";

export const add = defineSubCommand(
  {
    name: "add",
    description: "Adds two numbers",
    options: [
      { type: "Integer", name: "a", description: "First number", required: true },
      { type: "Integer", name: "b", description: "Second number", required: true }
    ]
  },
  async (interaction) => {
    const a = interaction.options.getInteger("a", true);
    const b = interaction.options.getInteger("b", true);
    await interaction.reply(`Result: ${a + b}`);
  }
);
```

### Step 2: Combine them into a Group (`.group.ts`)
To register the subcommands, combine them in a `.group.ts` file. The framework will automatically bundle them under the group name.

```typescript
// src/modules/math/commands/math.group.ts
import { defineCommandGroup } from "@/lib/helpers/defineCommandGroup";
import { add } from "./add.sub";

// This creates the command `/math add`
export const { config, subCommands } = defineCommandGroup(
  {
    name: "math",
    description: "Math operations",
  },
  [add] // Array of subcommands
);
```

---

## Command Registration & Cache

DJSToolkit uses a caching mechanism to determine if your commands have changed since the last startup. 
If no files were modified, the framework skips hitting the Discord API, saving you from hitting rate limits. 

Commands are automatically pushed globally in production, and instantly pushed to the `DEV_GUILD_ID` (if provided in your `.env`) during local development.