import { defineWorker } from "@/lib/helpers/defineWorker";
import { prisma } from "@/lib/prisma";

export const { config, run } = defineWorker(
  {
    name: "give-xp-bonus",
    description: "Gives bonus XP to all users",
  },
  async (job) => {
    const { amount } = job.data as { amount: number };
    await prisma.user.updateMany({ data: { xp: { increment: amount } } });
  },
);
