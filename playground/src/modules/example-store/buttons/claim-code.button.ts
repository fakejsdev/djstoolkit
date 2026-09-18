import { defineButton } from "@/lib/helpers/defineButton";
import { takeStore } from "@/lib/store";

/*
  defineButton(config, run)
  For full button docs, see example-core/buttons/demo.button.ts

  claimCode.button.ts — In-Memory Store button handler
  Demonstrates retrieving and deleting state atomically using takeStore.

  See example below:
*/

export const { config, run } = defineButton(
  {
    customId: "CLAIM_CODE",
    name: "Claim Code Button Handler",
    description: "Claims single-use code from store and invalidates state",
  },
  async (interaction, sessionId) => {
    if (!sessionId) {
      return await interaction.reply({
        content: "Error: Missing session ID.",
        ephemeral: true,
      });
    }

    const data = takeStore<{ secretCode: string; reward: string; generatedBy: string }>(sessionId);

    if (!data) {
      return await interaction.reply({
        content: "`❌` **Expired or Already Claimed!** This code is no longer available in store.",
        flags: ["Ephemeral"],
      });
    }

    return await interaction.reply({
      content: `\`🎉\` **Claimed!**\n- **Secret Code:** \`${data.secretCode}\`\n- **Reward:** ${data.reward}\n- **Owner:** ${data.generatedBy}`,
      flags: ["Ephemeral"],
    });
  },
);
