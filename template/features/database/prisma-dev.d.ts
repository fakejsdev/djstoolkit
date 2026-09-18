// This code is never shipped to the user/final development
declare module "@/lib/prisma/generated/client" {
  export namespace Prisma {
    type ModelName = string;
  }

  export type Prisma = {
    ModelName: string;
  };

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
      // biome-ignore lint: Expected to use any, to prevent errors withing examples
    }): any;
  }
}
