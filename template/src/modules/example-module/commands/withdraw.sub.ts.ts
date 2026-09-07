import { defineSubCommand } from "@/lib/helpers/defineSubCommand";
import { prisma } from "@/lib/prisma";

export const bankWithdraw = defineSubCommand(
  {
    name: "withdraw",
    description: "Withdraw from bank",
  },
  async (i) => {
    const newUser = await prisma.user.create({
      data: {
        name: Bun.randomUUIDv7(),
      },
    });

    return await i.reply(`someguy has been created ${newUser.name} - ${newUser.id}`);
  },
);
