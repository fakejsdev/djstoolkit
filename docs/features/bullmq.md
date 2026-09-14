# BullMQ (Background Jobs)

When building a Discord bot, some tasks shouldn't block the main event loop or need to be reliably scheduled for the future (e.g., removing a ban after 30 days, or sending a reminder after 5 minutes).

If you selected the **BullMQ** feature during setup, DJSToolkit provides a fully configured, **type-safe** Redis task queue.

---

## 1. Defining Job Types (`JobRegistry`)

To get perfect autocomplete and ensure you never pass the wrong data to a queue, you define your jobs in the global `JobRegistry`.

Open `src/lib/bullmq/jobs.ts` and add your jobs:

```typescript
// src/lib/bullmq/jobs.ts

export interface JobRegistry {
  "reminder": { channelId: string; userId: string; text: string };
  "unban": { guildId: string; targetId: string; reason: string };
}
```

---

## 2. Enqueueing Jobs (`enqueueJob`)

You can schedule a job from anywhere in your codebase. DJSToolkit provides a helper wrapper around BullMQ's `.add()` method that enforces your `JobRegistry` types.

```typescript
// src/modules/utility/commands/remind.command.ts
import { defineCommand } from "@/lib/helpers/defineCommand";
import { enqueueJob } from "@/lib/bullmq";

export const { config, run } = defineCommand(
  { name: "remind", description: "Sets a reminder" },
  async (interaction) => {
    // 1. We enqueue the 'reminder' job. 
    // TypeScript will error if we forget 'channelId', 'userId', or 'text'!
    await enqueueJob(
      "reminder", 
      { 
        channelId: interaction.channelId, 
        userId: interaction.user.id, 
        text: "Check the oven!" 
      },
      { delay: 5 * 60 * 1000 } // BullMQ options: delay for 5 minutes
    );

    await interaction.reply("Reminder set for 5 minutes!");
  }
);
```

---

## 3. Processing Jobs (`defineWorker`)

To process jobs, create a file ending in `.worker.ts` inside a `workers/` folder in your module. DJSToolkit automatically finds these files and attaches them to BullMQ Workers.

```typescript
// src/modules/utility/workers/reminder.worker.ts
import { defineWorker } from "@/lib/helpers/defineWorker";
import { client } from "@/lib/discord";

export const { config, run } = defineWorker(
  {
    name: "reminder", // Must exactly match a key in your JobRegistry
    description: "Sends the delayed reminder to the user",
  },
  async (job) => {
    // `job.data` is fully typed based on the 'reminder' interface!
    const { channelId, userId, text } = job.data;

    const channel = client.channels.cache.get(channelId);
    if (channel && channel.isTextBased()) {
      await channel.send(`<@${userId}>, here is your reminder: ${text}`);
    }
  }
);
```

### Why use Workers instead of `setTimeout`?
- **Persistence:** If your bot crashes or restarts, `setTimeout` timers are permanently lost. BullMQ saves jobs in Redis, meaning they survive restarts safely.
- **Scalability:** You can easily scale workers across multiple processes or machines.
- **Retries:** BullMQ can automatically retry failed jobs.