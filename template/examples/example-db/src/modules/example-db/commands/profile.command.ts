import { defineCommand } from "@/lib/helpers/defineCommand";
import { prisma } from "@/lib/prisma";

/*
  defineCommand(config, run)
  For full command docs, see example-core/commands/ping.command.ts

  profile.command.ts — Database feature live example
  Demonstrates querying and upserting user data with Prisma ORM.

  See example below:
*/

export const { config, run } = defineCommand(
  {
    name: "profile",
    description: "View your profile or another member's profile",
    options: [
      {
        type: "User",
        name: "target",
        description: "The user whose profile you want to view (defaults to yourself)",
        required: false,
      },
    ],
  },
  async (interaction) => {
    const targetUser = interaction.options.getUser("target") ?? interaction.user;

    const user = await prisma.user.upsert({
      where: { id: targetUser.id },
      update: {},
      create: { id: targetUser.id },
    });

    const joinedTimestamp = Math.floor(user.joinDate.getTime() / 1000);

    return await interaction.reply({
      content: `### 👤 Profile: ${targetUser.tag}\n- **User ID:** \`${user.id}\`\n- **First Registered:** <t:${joinedTimestamp}:D> (<t:${joinedTimestamp}:R>)`,
    });
  },
);
