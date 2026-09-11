import { defineDropdown } from "@/lib/helpers/defineDropdown";
import { prisma } from "@/lib/prisma";

export const { config, run } = defineDropdown(
  {
    customId: "xp-leaderboard-sort",
    name: "XP Leaderboard Sort",
    description: "Shows the leaderboard sorted by the selected field",
  },
  async (interaction) => {
    const sortBy = interaction.values[0] as "xp" | "level";

    const topUsers = await prisma.user.findMany({
      orderBy: { [sortBy]: "desc" },
      take: 5,
    });

    const list = topUsers.map((u, i) => `${i + 1}. <@${u.id}> — ${u[sortBy]} ${sortBy}`).join("\n");

    return await interaction.reply({ content: list || "No users yet.", flags: "Ephemeral" });
  },
);
