import { config } from "@config";
import { initHandlers } from "@/handlers";
import { client } from "@/lib/discord";
import { Console } from "@/lib/logger";

client.on("clientReady", async (client) => {
  await initHandlers(config);
  Console.Log(`Logged in as ${client.user.tag}`);
});

client.on("error", (error) => {
  config.onError?.(error, { source: "gateway", name: "client" });
});

client.login(process.env.DISCORD_BOT_TOKEN);
