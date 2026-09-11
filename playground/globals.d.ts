export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DISCORD_APP_ID: string;
      DISCORD_BOT_TOKEN: string;
      DEV_GUILD_ID?: string;
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
    }
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      REDIS_HOSTNAME?: string;
      REDIS_PORT?: string;
    }
  }
}
