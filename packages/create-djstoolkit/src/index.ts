#!/usr/bin/env bun
import { intro, note, outro } from "@clack/prompts";
import pkg from "@root/package.json";
import pc from "picocolors";
import { getAnswers } from "./prompts";
import { scaffold } from "./scaffold";

intro(
  `${pc.bgCyan(pc.black(` djstoolkit v${pkg.version} `))} ${pc.dim("scaffold a new Discord Bot")}`,
);

const answers = await getAnswers();
await scaffold(answers);

const nextSteps = [`cd ${answers.name}`];

if (!answers.installDependencies) nextSteps.push("bun install");

nextSteps.push("cp .env.example .env");
nextSteps.push(
  "Fill in your .env — get credentials at https://discord.com/developers/applications",
);

if (answers.bullmqHosting === "docker" || answers.dbHosting === "docker") {
  nextSteps.push("bun run services:up");
}

if (answers.dbProvider) {
  nextSteps.push("bun run prisma:push");
  nextSteps.push("bun run prisma:generate");
}

nextSteps.push("bun run dev");

note(nextSteps.join("\n"), "🎉 Project ready! Next steps");
outro("🥳 Happy coding!");
