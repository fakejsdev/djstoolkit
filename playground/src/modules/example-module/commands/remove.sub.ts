import { ApplicationCommandOptionType } from "discord.js";
import { defineSubCommand } from "@/lib/helpers/defineSubCommand";
import { prisma } from "@/lib/prisma";

export const removeXp = defineSubCommand(
  {
    name: "remove",
    description: "Removes user XP",
    options: [
      {
        type: ApplicationCommandOptionType.User,
        name: "user",
        description: "The user to remove XP from",
        required: true,
      },
      {
        type: ApplicationCommandOptionType.Integer,
        name: "amount",
        description: "How much XP to remove",
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
      update: { xp: { decrement: amount } },
      create: { id: user.id, xp: 0 },
    });

    let xp = dbUser.xp;

    if (xp < 0) {
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: { xp: 0 },
      });
      xp = updated.xp;
    }

    return await interaction.reply({
      content: `Removed ${amount}XP from user <@${user.id}>, now has ${xp}XP`,
      flags: "Ephemeral",
    });
  },
);
