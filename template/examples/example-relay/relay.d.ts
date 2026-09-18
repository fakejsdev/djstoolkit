declare module "@/lib/relay/events" {
  export interface RelayRegistry {
    "system:announcement": {
      title: string;
      message: string;
      author: string;
    };
  }
}
