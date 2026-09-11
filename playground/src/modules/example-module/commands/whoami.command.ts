import { defineCommand } from "@/lib/helpers/defineCommand";
import { prisma } from "@/lib/prisma";

export const { config, run } = defineCommand(
  {
    name: "whoami",
    description: "Shows your level, XP and rank",
  },
  async (interaction) => {
    const user = await prisma.user.findFirst({
      where: {
        id: interaction.user.id,
      },
    });

    if (!user)
      return await interaction.reply(
        "Seems like you don't exist...\nTry saying something on channel!",
      );

    return await interaction.reply(
      `## Hello <@${user.id}>\n- Current level: ${user.level}\n- Current XP: ${user.xp}\n-# You can earn XP by talking in chat!`,
    );
  },
);
