# In-Memory State Store

DJSToolkit provides a built-in, lightweight **State Store** specifically designed to solve a common problem in Discord bot development: **passing context between interactions** without shoving huge payloads into `customId`s or abusing `interaction.reply({ withResponse: true })` which adds latency.

The Store is a highly optimized `Map` with an automatic Time-To-Live (TTL) garbage collector, preventing any memory leaks when users abandon a flow.

---

## 1. Why do I need a Store?

Imagine a **/ban** command that opens a Confirm Button. You need to know *who* to ban when the button is clicked. 
Instead of doing:
`new ButtonBuilder().setCustomId("BAN_CONFIRM:123456789")`

You can use the store to keep your `customId`s clean and securely save complex data (objects, arrays, settings) that will be safely removed once the action is done or the TTL expires.

---

## 2. Using the Store

You interact with the Store using three simple functions: `setStore`, `getStore`, and `takeStore`.

### Setting Data (In the Command)
To save state, generate a unique session ID using our helper `createSessionId`, save your data to the store, and pass the generated ID to your Component.

```typescript
// src/modules/admin/commands/ban.command.ts
import { defineCommand } from "@/lib/helpers/defineCommand";
import { createSessionId } from "@/lib/helpers/session";
import { setStore } from "@/lib/store";

export const { config, run } = defineCommand(
  { name: "ban", description: "Bans a user" },
  async (interaction) => {
    const targetUserId = interaction.options.getUser("target", true).id;

    // 1. Create a unique customId, e.g., "BAN_CONFIRM:123e4567-e89b..."
    const customId = createSessionId("BAN_CONFIRM");
    
    // 2. Extract the sessionId UUID
    const [, sessionId] = customId.split(":");
    
    // 3. Save the state! (Expires in 15 minutes by default)
    setStore(sessionId, { targetUserId });

    // 4. Send the button
    const button = new ButtonBuilder()
      .setCustomId(customId)
      .setLabel("Confirm Ban")
      .setStyle(ButtonStyle.Danger);
      
    // ... reply with components
  }
);
```

### Retrieving Data (In the Component)

When the user clicks the button, our framework automatically extracts the `sessionId` and passes it as the second argument to your Component's `run` function.

```typescript
// src/modules/admin/buttons/banConfirm.button.ts
import { defineButton } from "@/lib/helpers/defineButton";
import { takeStore } from "@/lib/store";

export const { config, run } = defineButton(
  { customId: "BAN_CONFIRM", name: "Confirm Ban", description: "Executes the ban" },
  async (interaction, sessionId) => {
    
    // `takeStore` gets the data AND deletes it from memory immediately!
    // This prevents double-clicks from executing twice.
    const state = takeStore<{ targetUserId: string }>(sessionId);

    // If the data is gone (user clicked twice, or TTL expired)
    if (!state) {
      return interaction.reply({ content: "This session has expired.", ephemeral: true });
    }

    // Execute action using the state
    await interaction.guild.members.ban(state.targetUserId);
    await interaction.reply("User has been banned!");
  }
);
```

---

## 3. Store API Reference

- **`setStore<T>(key: string, data: T, ttlMs?: number): void`**
  Saves data to memory. The default TTL is 15 minutes (`15 * 60 * 1000` ms).
- **`getStore<T>(key: string): T | null`**
  Retrieves data. Returns `null` if the key doesn't exist or has expired.
- **`takeStore<T>(key: string): T | null`**
  Retrieves data and **immediately deletes it**. Perfect for single-use actions like Confirm Buttons.
- **`deleteStore(key: string): boolean`**
  Manually deletes data from the store.