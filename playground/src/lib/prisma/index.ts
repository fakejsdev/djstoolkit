import EventEmitter from "node:events";
import { PrismaPg } from "@prisma/adapter-pg";
import { type Prisma, PrismaClient } from "./generated/client";

type CrudOperation = "create" | "update" | "delete" | "upsert";

export type DbEventMap = {
  [K in `${Prisma.ModelName}.${CrudOperation}`]: [unknown];
};

export const dbEmitter = new EventEmitter<DbEventMap>();

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const base = new PrismaClient({ adapter });

export const prisma = base.$extends({
  query: {
    $allModels: {
      async $allOperations({ model, operation, args, query }) {
        const result = await query(args);

        if (["create", "update", "delete", "upsert"].includes(operation)) {
          dbEmitter.emit(`${model}.${operation}` as keyof DbEventMap, result);
        }

        return result;
      },
    },
  },
});
