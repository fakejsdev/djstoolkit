import { defineCommand } from "@/lib/helpers/defineCommand";
import { prisma } from "@/lib/prisma";

/*
  upsert — creates the user record on first run, returns existing on subsequent calls
  <t:timestamp:D> — Discord timestamp format, renders as a localized date in the client
*/

export const { config, run } = defineCommand(
  {
    name: "profile",
    description: "View your profile",
  },
  async (interaction) => {
    const user = await prisma.user.upsert({
      where: { id: interaction.user.id },
      update: {},
      create: { id: interaction.user.id, joinDate: new Date() },
    });

    return await interaction.reply(
      `**Profile**\nJoined: <t:${Math.floor(user.joinDate.getTime() / 1000)}:D>`,
    );
  },
);
