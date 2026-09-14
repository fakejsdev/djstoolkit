# Discord Events

DJSToolkit provides a clean, file-based approach to listening to Discord.js client events. Any file ending in `.djs.ts` inside a `events/` folder in your modules is automatically registered.

---

## 1. Defining an Event (`defineEvent`)

Instead of writing `client.on("eventName", ...)` inside a giant `index.ts` file, you create isolated event files. The framework gives you full TypeScript autocomplete for event names and automatically infers the correct payload types.

```typescript
// src/modules/logging/events/messageLog.djs.ts
import { defineEvent } from "@/lib/helpers/defineEvent";

export const { config, run } = defineEvent(
  {
    on: "messageCreate", // IntelliSense will suggest all available D.JS events!
    name: "Message Logger",
    description: "Logs every message sent in the server to the console",
  },
  (message) => {
    // TypeScript knows `message` is a Message object
    if (message.author.bot) return;

    console.log(`[${message.guild?.name}] ${message.author.tag}: ${message.content}`);
  }
);
```

---

## 2. One-time Events (`once`)

If you want an event to only trigger once (for example, executing setup logic when the bot boots up), you can add `once: true` to the configuration. 

```typescript
import { defineEvent } from "@/lib/helpers/defineEvent";

export const { config, run } = defineEvent(
  {
    on: "clientReady",
    once: true, // This event will only fire the first time the client is ready
    name: "Ready Log",
    description: "Logs when the bot comes online",
  },
  (client) => {
    console.log(`Successfully logged in as ${client.user.tag}!`);
  }
);
```

> **Note on `clientReady`:** Because modules are loaded asynchronously during startup, the native `clientReady` event might fire *before* your modules finish registering. To solve this, DJSToolkit manually re-emits `clientReady` once the framework is fully initialized, guaranteeing that your module handlers always catch it.

---

## 3. Best Practices

- **Keep it modular:** If your `economy` module needs to give users $100 when they join a guild, put the `guildMemberAdd` event inside `src/modules/economy/events/`. Don't bundle unrelated logic into a single file!
- **Use the Relay (Pub/Sub):** If an event needs to trigger actions across multiple distinct modules, consider having the `.djs.ts` event emit an internal [Relay System](../features/relay.md) event instead of importing everything directly.