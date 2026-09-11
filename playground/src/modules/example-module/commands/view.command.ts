import { ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } from "discord.js";
import { defineCommand } from "@/lib/helpers/defineCommand";
import { prisma } from "@/lib/prisma";

export const { config, run } = defineCommand(
  {
    name: "xp-view",
    description: "View your XP stats",
  },
  async (interaction) => {
    const user = await prisma.user.findUnique({ where: { id: interaction.user.id } });

    const refreshButton = new ActionRowBuilder<ButtonBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId("refresh-xp")
        .setLabel("Refresh")
        .setStyle(ButtonStyle.Secondary),
    );

    const sortDropdown = new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
      new StringSelectMenuBuilder()
        .setCustomId("xp-leaderboard-sort")
        .setPlaceholder("View leaderboard by...")
        .addOptions({ label: "Top XP", value: "xp" }, { label: "Top Level", value: "level" }),
    );

    return await interaction.reply({
      content: `You have **${user?.xp ?? 0} XP** (Level ${user?.level ?? 1})`,
      components: [refreshButton, sortDropdown],
    });
  },
);
