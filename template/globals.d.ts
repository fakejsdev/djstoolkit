namespace NodeJS {
  interface ProcessEnv {
    DISCORD_APP_ID: string;
    DISCORD_BOT_TOKEN: string;
    DEV_GUILD_ID?: string;
    DATABASE_URL: string;
    REDIS_HOSTNAME?: string;
    REDIS_PORT?: string;
  }
}
