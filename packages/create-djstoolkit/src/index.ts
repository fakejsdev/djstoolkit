#!/usr/bin/env bun
import { note, outro } from "@clack/prompts";
import { getAnswers } from "./prompts";
import { scaffold } from "./scaffold";

const answers = await getAnswers();
await scaffold(answers);

const steps = [`cd ${answers.name}`];
if (!answers.installDeps) steps.push("bun install");
if (answers.dbHosting === "docker" || answers.bullmqHosting === "docker")
  steps.push("docker compose up -d");
steps.push("bun run dev");

note(steps.map((step) => `$ ${step}`).join("\n"), "🎉 Project ready! Next steps");
outro("🥳 Happy coding!");
