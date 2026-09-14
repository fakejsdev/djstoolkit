# Event Relay (Pub/Sub)

DJSToolkit includes a lightweight, **100% type-safe internal event bus** called `Relay`. 

While Discord.js handles external events (like a user sending a message), `Relay` allows you to broadcast *internal* events within your bot. This is incredibly useful for decoupling your code—for example, letting your database module notify your logging module that a user leveled up, without either module having to directly import the other.

---

## 1. Defining Events (Type-Safety)

To get perfect IntelliSense and payload validation, you must register your events in the `RelayRegistry`. This is done using TypeScript's **module augmentation**.

Open `src/lib/relay/events.ts` and add your custom events to the interface:

```typescript
// src/lib/relay/events.ts

// The base interface provided by the framework
export interface RelayRegistry {
  "user:leveledUp": { userId: string; newLevel: number };
  "guild:raidDetected": { guildId: string; spammerCount: number };
}
```

Now, TypeScript knows exactly what data is required when sending or listening to these events!

---

## 2. Sending Events

You can send an event from anywhere in your codebase using `relay.send()`. Thanks to the registry, your IDE will autocomplete the event names and validate the payload.

```typescript
// src/modules/economy/commands/addXp.command.ts
import { defineCommand } from "@/lib/helpers/defineCommand";
import { relay } from "@/lib/relay";

export const { config, run } = defineCommand(
  {
    name: "add-xp",
    description: "Adds XP to a user",
  },
  async (interaction) => {
    // ... logic to add XP ...
    const newLevel = 5;

    // Broadcast the event internally!
    // TypeScript ensures you provide 'userId' and 'newLevel'.
    relay.send("user:leveledUp", { 
      userId: interaction.user.id, 
      newLevel 
    });

    await interaction.reply("XP added!");
  }
);
```

---

## 3. Listening to Events

Any module can listen to `Relay` events without needing to know where they came from.

```typescript
// src/modules/logging/events/levelUpLogger.djs.ts
import { defineEvent } from "@/lib/helpers/defineEvent";
import { relay } from "@/lib/relay";

export const { config, run } = defineEvent(
  {
    on: "clientReady",
    name: "Initialize Relay Listeners",
    description: "Listens for internal events once the bot starts",
  },
  () => {
    // TypeScript knows `payload` has `userId` and `newLevel`!
    relay.on("user:leveledUp", (payload) => {
      console.log(`🎉 User ${payload.userId} just reached level ${payload.newLevel}!`);
    });
  }
);
```

---

## API Reference

The `relay` object provides the following methods, all fully typed against your `RelayRegistry`:

- **`relay.send(event, payload)`**: Emits an event with the specified payload.
- **`relay.on(event, listener)`**: Listens for the event. The listener receives the typed payload.
- **`relay.once(event, listener)`**: Listens for the event exactly once, then automatically removes the listener.
- **`relay.off(event, listener)`**: Removes a previously registered listener.
