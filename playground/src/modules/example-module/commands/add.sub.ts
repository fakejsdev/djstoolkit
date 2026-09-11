import { ApplicationCommandOptionType } from "discord.js";
import { defineSubCommand } from "@/lib/helpers/defineSubCommand";
import { prisma } from "@/lib/prisma";

export const addXp = defineSubCommand(
  {
    name: "add",
    description: "Adds user XP",
    options: [
      {
        type: ApplicationCommandOptionType.User,
        name: "user",
        description: "The user to add XP to",
        required: true,
      },
      {
        type: ApplicationCommandOptionType.Integer,
        name: "amount",
        description: "How much XP to add",
        required: true,
        min_value: 1,
      },
    ],
  },
  async (interaction) => {
    const user = interaction.options.getUser("user", true);
    const amount = interaction.options.getInteger("amount", true);

    const dbUser = await prisma.user.upsert({
      where: { id: user.id },
      update: { xp: { increment: amount } },
      create: { id: user.id, xp: amount },
    });

    const leveledUp = dbUser.xp >= dbUser.level * 100;
    let level = dbUser.level;

    if (leveledUp) {
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: { level: { increment: 1 } },
      });
      level = updated.level;
    }

    return await interaction.reply({
      content: `Added ${amount}XP to user <@${user.id}>, level ${level}`,
      flags: "Ephemeral",
    });
  },
);
