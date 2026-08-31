import { defineSubCommand } from "@/lib/helpers/defineSubCommand";

export const bankWithdraw = defineSubCommand(
  {
    name: "withdraw",
    description: "Withdraw from bank",
  },
  async (i) => {
    return await i.reply({
      content: "Ok!",
      flags: ["Ephemeral"],
    });
  },
);
