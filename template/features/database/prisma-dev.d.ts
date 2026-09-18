declare module "@/lib/prisma/generated/client" {
  export namespace Prisma {
    type ModelName = string;
  }

  // Development mock to prevent TS errors in monorepo
  // This code is never shipped to the user
  declare module "@/lib/prisma/generated/client" {
    export namespace Prisma {
      type ModelName = string;
    }

    export class PrismaClient {
      constructor(options?: unknown);
      $extends(extension: {
        query?: {
          $allModels?: {
            $allOperations?: (params: {
              model: string;
              operation: string;
              args: unknown;
              query: (args: unknown) => Promise<unknown>;
            }) => Promise<unknown>;
          };
        };
      }): unknown;
    }
  }
}
