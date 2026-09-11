import { defineDbEvent } from "@/lib/helpers/defineDbEvent";
import type { User } from "@/lib/prisma/generated/client";

export const { config, run } = defineDbEvent(
  {
    on: "User.create",
    name: "Welcome New User",
    description: "Greets a user the first time they get tracked",
  },
  async (payload) => {
    const user = payload as User;
    console.log(`New user started earning XP: ${user.id}`);
  },
);
