import { defineButton } from "@/lib/helpers/defineButton";
import { prisma } from "@/lib/prisma";

export const { config, run } = defineButton(
  {
    customId: "refresh-xp",
    name: "Refresh XP",
    description: "Refreshes the displayed XP stats",
  },
  async (interaction) => {
    const user = await prisma.user.findUnique({ where: { id: interaction.user.id } });

    return await interaction.update({
      content: `You have **${user?.xp ?? 0} XP** (Level ${user?.level ?? 1})`,
    });
  },
);
