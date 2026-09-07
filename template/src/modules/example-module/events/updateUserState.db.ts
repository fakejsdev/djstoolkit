import { defineDbEvent } from "@/lib/helpers/defineDbEvent";

export const { config, run } = defineDbEvent(
  {
    on: "User.create",
    name: "update user state",
    description: "something",
  },
  () => {
    console.log("new user was created!!!");
  },
);
