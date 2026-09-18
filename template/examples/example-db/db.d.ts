// Example-specific model types for example-db
declare module "@/lib/prisma/generated/client" {
  export interface User {
    id: string;
    joinDate: Date;
  }
}
