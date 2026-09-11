import { defineEvent } from "@/lib/helpers/defineEvent";
import { prisma } from "@/lib/prisma";

export const { config, run } = defineEvent(
  {
    on: "messageCreate",
    name: "Add XP",
    description: "Adds XP for chatting",
  },
  async (message) => {
    if (message.author.bot) return;
    const messageAuthor = message.author.id;

    const user = await prisma.user.upsert({
      where: { id: messageAuthor },
      update: { xp: { increment: 70 } },
      create: { id: messageAuthor, xp: 70 },
    });

    const leveledUp = user.xp >= user.level * 100;

    if (leveledUp) {
      await prisma.user.update({
        where: { id: messageAuthor },
        data: { level: { increment: 1 } },
      });

      await message.channel.send(`🎉 ${message.author} just leveled up!`);
    }
  },
);
