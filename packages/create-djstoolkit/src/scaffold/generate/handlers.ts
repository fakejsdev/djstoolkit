import type { Feature } from "../../prompts";

export const generateHandlersFile = (features: Feature[]): string => {
  const imports = [
    `import type { Client } from "discord.js";`,
    `import { initCommandsHandler } from "./commands/commandsHandler";`,
    `import { initEventsHandler } from "./events/eventsHandler";`,
    `import { initComponentsHandler } from "./components";`,
  ];
  const calls = [
    `initCommandsHandler(client);`,
    `initEventsHandler(client);`,
    `initComponentsHandler(client);`,
  ];

  if (features.includes("db")) {
    imports.push(`import { initDbEventsHandler } from "./db/dbEventsHandler";`);
    calls.push(`initDbEventsHandler();`);
  }

  if (features.includes("bullmq")) {
    imports.push(`import { initWorkerHandler } from "./workers/workerHandler";`);
    calls.push(`initWorkerHandler();`);
  }

  return `${imports.join("\n")}

export const initHandlers = (client: Client) => {
  ${calls.join("\n  ")}
};
`;
};
