declare module "@/lib/bullmq/jobs" {
  interface JobRegistry {
    "send-reminder": {
      channelId: string;
      reminder: string;
    };
  }
}
