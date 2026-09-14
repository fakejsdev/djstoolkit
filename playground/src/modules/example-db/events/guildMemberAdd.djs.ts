import { defineEvent } from "@/lib/helpers/defineEvent";
import { prisma } from "@/lib/prisma";

// upsert guards against duplicate records if the member rejoins the server

export const { config, run } = defineEvent(
  {
    on: "guildMemberAdd",
    name: "Create profile on join",
    description: "Creates a DB record when a member joins the server",
  },
  async (member) => {
    await prisma.user.upsert({
      where: { id: member.id },
      update: {},
      create: { id: member.id, joinDate: new Date() },
    });
  },
);
