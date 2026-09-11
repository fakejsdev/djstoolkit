#!/usr/bin/env bun
import { note, outro } from "@clack/prompts";
import { getAnswers } from "./prompts";
import { scaffold } from "./scaffold";

const answers = await getAnswers();
await scaffold(answers);

const nextSteps = [`cd ${answers.name}`];

if (!answers.installDependencies) nextSteps.push("bun install");

nextSteps.push("cp .env.example .env");
nextSteps.push(
  "Fill in your .env — get credentials at https://discord.com/developers/applications",
);

if (answers.bullmqHosting === "docker" || answers.dbHosting === "docker") {
  nextSteps.push("docker compose -f docker-compose.services.yml up -d");
}

nextSteps.push("bun run dev");

note(
  nextSteps.map((step) => (step.startsWith("Fill in") ? step : `$ ${step}`)).join("\n"),
  "🎉 Project ready! Next steps",
);

outro("🥳 Happy coding!");
