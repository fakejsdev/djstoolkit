import { defineButton } from "@/lib/helpers/defineButton";

/*
  banConfirm.button.ts — Button handler with prefix-routed target user ID
  Receives targetUserId as the second argument (sessionId).
*/

export const { config, run } = defineButton(
  {
    customId: "CONFIRM_BAN",
    name: "Confirm Ban Button Handler",
    description: "Executes ban confirmation for the target user ID",
  },
  async (interaction, targetUserId) => {
    if (!targetUserId) {
      return await interaction.reply({
        content: "Error: No target user ID provided in button session.",
        flags: ["Ephemeral"],
      });
    }

    const targetUser = await interaction.client.users.fetch(targetUserId);

    // Handle actual banning, we won't ban anyone, it's just an example
    return await interaction.reply({
      content: `\`🔨\` Member **${targetUser.tag}** (ID: \`${targetUserId}\`) has been banned!`,
      flags: ["Ephemeral"],
    });
  },
);
